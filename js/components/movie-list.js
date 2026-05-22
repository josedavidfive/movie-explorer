import { MovieCard } from './movie-card.js';

export function renderMovieList(movies, onMovieClick, append = false) {
  const grid = document.getElementById('movies-grid');
  const html = movies.map(movie => MovieCard(movie)).join('');
  append ? grid.innerHTML += html : grid.innerHTML = html;

  grid.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', () => onMovieClick(card.dataset.id));
  });
}