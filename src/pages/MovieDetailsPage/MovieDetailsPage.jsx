import React, { useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { fetchMovieDetailsById } from '../../services/api';
import Movie from '../../components/Movie/Movie';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';
import { TiArrowLeftThick } from "react-icons/ti";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.tab, isActive && css.activeTab);
};

const MovieDetailsPage = () => {
  const params = useParams();
  const [movieDetails, setMovieDetails] = useState();

  const location = useLocation();
  const goBackRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieDetails = await fetchMovieDetailsById(params.movieId);
        setMovieDetails(movieDetails);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieDetails();
  }, [params.movieId]);
  return (
    <div className={css.movieDetailsPage}>
      <Link to={goBackRef.current}><TiArrowLeftThick  className={css.goBackArrow} /></Link>
        {movieDetails && <Movie data={movieDetails}></Movie>}
        <div className={css.movieAdditionalInfoWrapper}>
          <h3 className={css.subtitle}>Additional information</h3>
          <nav className={css.tabs}>
            <NavLink to="cast" className={buildLinkClass}>Cast</NavLink>
            <NavLink to="reviews" className={buildLinkClass}>Reviews</NavLink>
          </nav>
          <Outlet />
        </div>      
    </div>
  );
};

export default MovieDetailsPage;
