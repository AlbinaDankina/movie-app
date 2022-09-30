
import { Pagination, Tabs, Alert } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import './app2.css';

import InternetConnectionDetector from '../errors-handling/internet-connection-detector.jsx';
import Input from '../input/input';
import ItemsList from '../items-list/items-list';
import RatedList from '../items-list/rated-list';
import Spinner from '../spinner';
import ErrorIndicator from '../errors-handling/error-indicator';
import { getRatedMovies, getData, getGenres, saveGuestSessionId } from '../service/fetch-data';
import { MovieContext } from '../service/movie-context';


const App = () => {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]); // все найденное
  const [input, setInput] = useState('');  // данные из input
  const [current, setCurrent] = useState(1); // текущ страница
  const [totalPages, setTotalPages] = useState(1);
  const [ratedFilm, setRatedFilm] = useState([]); // фильмы, которым проставили рейтинги
  const [genres, setGenres] = useState([]); // список жанров
  
 
  // начальный вызов фильмов на странцие Search с query = 'return' + вызов жанров и запись в контекст  + вызов гостевого ID:
  useEffect(() => {
    getData('return', current, setLoading, setMovies, setError, setTotalPages, setInput);
    saveGuestSessionId();
    getGenres(setGenres);

    // if(localStorage.getItem('stars')) {
    //   setStars(JSON.parse(localStorage.getItem('stars')))
    // }; 

  }, []);
  
  // вызов фильмов с задержкой по набору в input:
  const searchMovie = useCallback(debounce((text, page) => {
    if (text !== '') {
      getData(text, page, setLoading, setMovies, setError, setTotalPages, setInput); 
    };
  }, 1000), []);

  // пагинация на Search
  const pagination = (page) => {
    setCurrent(page);
    getData(input, page, setLoading, setMovies, setError, setTotalPages, setInput);
  };
 
  if (error) return <ErrorIndicator />;
  if (!movies && loading) return <Spinner />;

  const items = [
    { label: 'Search', key: 'item-1', children: (
      <>
        <Input searchMovie={searchMovie} setInput={setInput} input={input} />
        
        {movies.length !== 0 && !loading ? <ItemsList movies={movies} loading={loading} 
        // stars={stars} 
        // onUpdateStars={onUpdateStars} 
        /> 
                             : movies.length === 0 && !loading ? <Alert message="Nothing found. Please try again" type="info" />
                             : <Spinner /> }

        <Pagination defaultCurrent={1} size="small" onChange={pagination} total={totalPages} hideOnSinglePage/>
      </>
    )},
    { label: 'Rated', key: 'item-2', children: (
     <>
      { ratedFilm.length !== 0 ? <RatedList movies={ratedFilm} loading={loading}  /> : <Spinner /> }
     </>
    )}
  ];

  return (
    <>
      <InternetConnectionDetector />
      <MovieContext.Provider value={{genres, movies}} >
        <Tabs 
          items={items} 
          centered 
          onChange={(e) => { if (e === "item-2") getRatedMovies(setRatedFilm) }}
        />
      </MovieContext.Provider>
    </>
 )
};

export default App;