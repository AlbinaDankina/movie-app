import { format } from 'date-fns';
import { Rate } from 'antd';
import { useContext, useState, useEffect } from 'react';

import './item2.css';
import Spinner from '../spinner';
import { truncateName, truncate } from '../../logics/truncate-text';
import { onPostRate, findMatchedGenres } from '../service/fetch-data';
import { MovieContext } from '../service/movie-context';


const ItemsList = ({ movies }) => {

  // объект объектов - рейтингов по всем фильмам
  const [stars, setStars] = useState({});
  const onUpdateStars = (obj) => {
    console.log(obj);
    setStars(obj)
  };

  const { genres } = useContext(MovieContext);


  // формируем карточки фильмов
  const movieCards = movies.map((item) => {
  
    // для каждого фильма вытягиваем массив с id его жанров:
    let itemGenresIdx = item.genre_ids;
    
    // В fetch-data завели функцию, возвращающую массив НАИМЕНОВАНИЙ совпавших жанров по КАЖДОМУ фильму:
    const itemGenres = findMatchedGenres(itemGenresIdx, genres);
    let genreNames = [];
    
    const itemGenresNames = itemGenres.map((genre) => genreNames.push(genre.name));

    return (
      <li key={item.id} className="item">
        
        <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="no poster available" />
        
        <div className="item_info">
          <h1>{truncateName(item.title)}</h1>
          {item.release_date ? <h3>{format(new Date(item.release_date), 'MMM dd, yyyy')}</h3> : null}        
          <span>{genreNames.join(', ')}</span>
          <p className="description">{truncate(item.overview)}</p>
          <div className="item_ranking" style={{
                    border:
                    item.vote_average <= 3
                        ? "2px solid #E90000"
                        : 3 < item.vote_average && item.vote_average <= 5
                        ? "#2px solid E97E00"
                        : 5 < item.vote_average && item.vote_average <= 7
                        ? "2px solid #E9D100"
                        : "2px solid #66E900",
                  }}>{(item.vote_average).toFixed(1)}</div>
         
            <Rate
            // value = {stars[item.id]}
             onChange={(value) => {
              const stars = localStorage.getItem('stars');
              console.log(stars);
              if (!stars) localStorage.setItem('stars', '{}');
              const newObject = JSON.parse(stars);
              newObject[item.id] = value;
              localStorage.setItem('stars', JSON.stringify(newObject));
              onUpdateStars(stars);
              onPostRate(item.id, value); 
            }} 
            count={10} />
  
        </div>
    </li>
    )
  });

  return ( 
    <div className="container">
      <ul className="items_list">
        {movieCards}
      </ul>
    </div>
  );
};

export default ItemsList;


export const MovieCard = () => {

}