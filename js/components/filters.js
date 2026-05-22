import { getGenres } from '../api/tmdb-api.js';

export function getFilterValues() {
  return {
    genre: document.getElementById('genre-filter').value,
    rating: document.getElementById('rating-filter').value,
    year: document.getElementById('year-filter').value,
    sortBy: document.getElementById('order-by-filter').value,
  };
}

// Convierte los valores del formulario en parámetros que acepta la API
export function buildAPIFilters({ genre, rating, year, sortBy }) {
  const filters = {};

  if (genre) filters.with_genres = genre;
  if (rating) filters['vote_average.gte'] = rating;
  if (year) filters['primary_release_date.gte'] = `${year}-01-01`;
  if (sortBy) filters.sort_by = sortBy;

  return filters;
}

// Carga los géneros desde TMDB y rellena el select dinámicamente
export async function loadGenres() {
  const { genres } = await getGenres();
  const select = document.getElementById('genre-filter');

  genres.forEach(({ id, name }) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = name;
    select.appendChild(option);
  });
}