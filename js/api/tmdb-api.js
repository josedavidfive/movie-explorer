import { API_KEY, BASE_URL, LANG } from '../utils/constants.js';

async function fetchFromAPI(endpoint, params = {}) {
  const queryString = new URLSearchParams({
    api_key: API_KEY,
    language: LANG,
    ...params
  }).toString();
  const response = await fetch(`${BASE_URL}/${endpoint}?${queryString}`);
  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
  return response.json();
}

export const searchMovies = (query) =>
  fetchFromAPI('search/movie', { query });

export const getPopularMovies = () =>
  fetchFromAPI('movie/popular');

export const getGenres = () =>
  fetchFromAPI('genre/movie/list');

export const getFilteredMovies = (filters = {}) =>
  fetchFromAPI('discover/movie', filters);

export const getMovieDetails = (movieId) =>
  fetchFromAPI(`movie/${movieId}`, { append_to_response: 'production_countries' });

export const getMovieCredits = (movieId) =>
  fetchFromAPI(`movie/${movieId}/credits`);

export const getMovieVideos = (movieId) =>
  fetchFromAPI(`movie/${movieId}/videos`);

export const getMovieProviders = (movieId) =>
  fetchFromAPI(`movie/${movieId}/watch/providers`);