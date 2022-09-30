import { format } from 'date-fns';
import { Rate } from 'antd';
import { useContext, useState, useEffect } from 'react';

import './item2.css';
import { truncateName, truncate } from '../../logics/truncate-text';
import { onPostRate, findMatchedGenres } from '../service/fetch-data';
import { MovieContext } from '../service/movie-context';

const MovieCard = ({item}) => {
  
    // кол-во звездного рейтинга у фильма:
    const [stars, setStars] = useState(0);
   
    // проверка наличия звезд-рейтинга при обновлении страницы  
    useEffect(() => {
      if (localStorage.getItem('stars')) {
        const stars = JSON.parse(localStorage.getItem('stars'));
        const star = stars[item.id];
        if (stars[item.id]) setStars(star) }}, []);
  

    const { genres } = useContext(MovieContext);
  
  
      // для каждого фильма вытягиваем массив с id его жанров:
      let itemGenresIdx = item.genre_ids;
      // В fetch-data завели функцию, возвращающую массив НАИМЕНОВАНИЙ совпавших жанров по КАЖДОМУ фильму:
      const itemGenres = findMatchedGenres(itemGenresIdx, genres);
      let genreNames = [];
      const itemGenresNames = itemGenres.map((genre) => genreNames.push(genre.name));
      return (
        <li key={item.id} className="item">
          
          <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="no poster available" />
          <div>{item.id}</div>
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
              value = {stars}
               onChange={(value) => {
                const stars = localStorage.getItem('stars');
                if (!stars) localStorage.setItem('stars', '{}');
                const newObject = JSON.parse(localStorage.getItem('stars'));
                newObject[item.id] = value;
                localStorage.setItem('stars', JSON.stringify(newObject));
                console.log(value);
                // onUpdateStars(stars);
                setStars(value);
                onPostRate(item.id, value); 
              }} 
              count={10} />
    
          </div>
      </li>
      )
    // формируем карточки фильмов
    // const movieCards = movies.map((item) => {
    
    // });
  };

  export default MovieCard;