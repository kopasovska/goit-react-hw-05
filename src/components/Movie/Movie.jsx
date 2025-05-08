import React from 'react';
import { GENRE_MAP } from '../../services/api';
import css from './Movie.module.css';
import defaultPoster from '../../images/default-poster.jpeg'
import { FaStar } from "react-icons/fa6";

const Movie = ({ data }) => {
  const releaseYear = new Date(data.release_date).getFullYear();

  return (
    <div className={css.movieDetails}>
      <div className={css.posterContainer}><img src={data.poster_path ? `https://image.tmdb.org/t/p/w342${data.poster_path}` : defaultPoster} alt={data.title} className={css.poster}/></div>
      <div className={css.movieInfo}>
        <div>
          <h2 className={css.movieTitle}>{data.title}</h2>
          <p className={css.movieText}>{releaseYear}</p>
        </div>
        <ul className={css.genresList}>
          {data.genres.map(genre => (
            <li key={genre.id} className={css.genresItem}>{genre.name}</li>
          ))}
        </ul>
        <p className={css.movieText}>{data.overview}</p>
        <h3 className={css.movieSubtitle}>Details:</h3>
        <ul className={css.detailsList}>
          <li className={css.detailsItem}>
          <FaStar className={css.star} />
          <span className={css.movieAccentText}>{Math.round(data.vote_average * 10) / 10}</span>
          </li>
          <li className={css.detailsItem}>
            <span className={css.movieAccentText}>Runtime:</span> 
            <span className={css.movieText}>{data.runtime} min</span>
          </li>
          <li className={css.detailsItem}>
          <span className={css.movieAccentText}>Budget:</span> 
          <span className={css.movieText}>{data.budget} $</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Movie;
