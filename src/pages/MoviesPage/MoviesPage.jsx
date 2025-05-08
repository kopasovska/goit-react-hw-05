import React, { useEffect, useRef, useState } from 'react';
import css from './MoviesPage.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import { fetchMoviesByQuery } from '../../services/api';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const userQuery = searchParams.get('query') || '';
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  const fetchedPages = useRef(new Set());

  useEffect(() => {
    if (!userQuery) return;

    const key = `${userQuery}_${page}`;
    if (fetchedPages.current.has(key)) return;
    fetchedPages.current.add(key);

    const abortController = new AbortController();
    const getMovies = async () => {
      try {
        setLoading(true);

        const response = await fetchMoviesByQuery(
          userQuery,
          page,
          abortController.signal,
        );
        if (response.total_results === 0) {
          toast.error('Sorry, no results found for your query.');
        }
        setMovies(prev => [...prev, ...response.results]);
        setTotalPages(response.total_pages);
      } catch (error) {
        console.log(error);
        if (error.name !== 'AbortError') {
          setIsError(true);
        }
      } finally {
        setLoading(false);
      }
    };
    getMovies();
    return () => {
      abortController.abort();
    };
  }, [userQuery, page]);

  const handleChangeQuery = newQuery => {
    if (newQuery.trim() === '') {
      toast.error('Query can not be empty!');
      return;
    }
    setMovies([]);
    setPage(1);
    searchParams.set('query', newQuery);
    searchParams.set('page', Number(page));
    setSearchParams(searchParams);
  };

  const updatePage = () => {
    const newPage = page + 1;
    setPage(newPage);
    searchParams.set('page', newPage);
    setSearchParams(searchParams);
  };

  return (
    <div className={css.moviesPageWrapper}>
      <SearchBar handleChangeQuery={handleChangeQuery}></SearchBar>
      {userQuery && !isError && <MovieList data={movies}></MovieList>}
      {isError && <ErrorMessage></ErrorMessage>}
      {loading && !isError && <Loader></Loader>}
      {page < totalPages && !loading && !isError && (
        <LoadMoreBtn clickHandler={updatePage}></LoadMoreBtn>
      )}
    </div>
  );
};

export default MoviesPage;
