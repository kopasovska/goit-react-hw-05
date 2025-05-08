import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchGenres, GENRE_MAP } from '../../services/api';
import css from './MovieList.module.css';
import defaultPoster from '../../images/default-poster.jpeg';
import clsx from 'clsx';

const MovieList = ({ data }) => {
  (async () => {
    await fetchGenres();
  })();

  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {data.map(item => (
        <li key={item.id}  className={css.movieItem}>
          <Link to={'/movies/' + item.id} state={location} className={css.movieLink}>
            <img src={item.poster_path ? `https://image.tmdb.org/t/p/w185${item.poster_path}` : defaultPoster} alt={item.title} className={css.moviePoster} />
            <div className={css.movieInfoWrapper}>
              <p className={css.movieTitle}>{item.title}</p>
              <div className={css.movieDetails}>
                <ul className={css.movieGenres}>
                  {item.genre_ids.map(id => (
                    <li key={id} className={css.movieText}>{GENRE_MAP[id]}</li>
                  ))}
                </ul>
                <p className={clsx(css.movieRating, css.movieText)}>{Math.round(item.vote_average * 10) / 10}</p>             
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
