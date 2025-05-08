import MovieList from '../../components/MovieList/MovieList';
import { fetchTrendingMovies } from '../../services/api';
import css from './HomePage.module.css';
import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const movies = await fetchTrendingMovies();
        setTrendingMovies(movies.results);
      } catch (error) {
        console.log(error);
      }
    };
    getTrendingMovies();
  }, []);
  return (
    <div className={css.homePageWrapper}>
      <h2 className={css.title}>Trending Films</h2>
      <MovieList data={trendingMovies} />
    </div>
  );
};

export default HomePage;
