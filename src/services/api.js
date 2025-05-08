import axios from 'axios';

const BASE_URL = `https://api.themoviedb.org/3`;
const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjRhYjI0NTZkNTc1YWJhZjM5Mzc2MDM1MjRjNDA5MCIsIm5iZiI6MTc0NTgzNzA2MC41MjMsInN1YiI6IjY4MGY1YzA0OTMwYzg5NWUyODBmODgwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgWXhwSgc4i5eg6UbZDXPieO8ezw-GqoubOofcezh1c',
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/day?language=en-US`,
    options,
  );
  return response.data;
};

export const fetchMoviesByQuery = async (query, page, signal) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&page=${page}`,
    options,
    signal,
  );
  console.log(response);
  return response.data;
};

export const fetchMovieDetailsById = async id => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, options);
  return response.data;
};

export const fetchMovieCastById = async id => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, options);
  console.log(response.data.cast);
  return response.data.cast;
};

export const fetchMovieReviewsById = async id => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
  return response.data.results;
};

export let GENRE_MAP = {};
export async function fetchGenres() {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, options);

    const genres = response.data.genres;
    GENRE_MAP = genres.reduce((acc, genre) => {
      acc[genre.id] = genre.name;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching genres:', error.message);
  }
}
