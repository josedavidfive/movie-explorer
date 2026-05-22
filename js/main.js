import { getFilteredMovies, getMovieCredits, getMovieDetails, getMovieProviders, getMovieVideos, getPopularMovies, searchMovies } from './api/tmdb-api.js';
import { buildAPIFilters, getFilterValues, loadGenres } from './components/filters.js';
import { showSkeletons } from './components/loader.js';
import { renderMovieList } from './components/movie-list.js';
import { buildModalHTML, closeModal, openModal } from './components/movie-modal.js';
import { initSearchHistory, renderHistory } from './components/search-bar.js';
import { Movie } from './models/Movie.js';
import { addToHistory } from './services/storage-service.js';
import { initTheme } from './services/theme-service.js';
import { debounce } from './utils/debounce.js';
import { filterMovies, sortMovies } from './utils/helpers.js';

let searchResults = [];
let currentPage = 1;
let totalPages = 1;
let isLoading = false;

const SKELETON_DELAY = 500;
const delay = (ms) => new Promise(r => setTimeout(r, ms));

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) loadMore();
});

async function handleMovieClick(id) {
  openModal('<p>Cargando...</p>');
  const [movie, credits, videos, providers] = await Promise.all([
    getMovieDetails(id),
    getMovieCredits(id),
    getMovieVideos(id),
    getMovieProviders(id)
  ]);
  openModal(buildModalHTML({ movie, credits, videos, providers }));
}

async function search() {
  currentPage = 1;
  totalPages = 1;
  isLoading = false;

  showSkeletons();

  try {
    await delay(SKELETON_DELAY);

    const query = document.getElementById('search-input').value.trim();
    const { genre, rating, year, sortBy } = getFilterValues();

    if (query) {
      const data = await searchMovies(query, currentPage);
      totalPages = data.total_pages;
      searchResults = data.results.map(item => new Movie(item));
      addToHistory(query);
      renderHistory(search);

      if (!searchResults.length) {
        document.getElementById('movies-grid').innerHTML =
          '<p class="error-msg">No se encontraron películas para esa búsqueda.</p>';
        return;
      }

      renderMovieList(sortMovies(filterMovies(searchResults, { genre, rating, year }), sortBy), handleMovieClick);

    } else {
      searchResults = [];
      const data = await getFilteredMovies({ ...buildAPIFilters({ genre, rating, year, sortBy }), page: currentPage });
      totalPages = data.total_pages;
      renderMovieList(data.results.map(item => new Movie(item)), handleMovieClick);
    }

  } catch (error) {
    console.error('Error en búsqueda:', error);
    document.getElementById('movies-grid').innerHTML =
      '<p class="error-msg">Error al cargar películas. Inténtalo de nuevo.</p>';

  } finally {
    isLoading = false;
  }
}

async function loadMore() {
  const query = document.getElementById('search-input').value.trim();
  if (isLoading || currentPage >= totalPages || query) return;

  isLoading = true;
  currentPage++;
  observer.disconnect();

  const loadingText = document.getElementById('loading-text');
  loadingText.classList.remove('hidden');

  try {
    await delay(1000);
    const { genre, rating, year, sortBy } = getFilterValues();
    const data = await getFilteredMovies({ ...buildAPIFilters({ genre, rating, year, sortBy }), page: currentPage });
    renderMovieList(data.results.map(item => new Movie(item)), handleMovieClick, true);

  } catch (error) {
    console.error('Error cargando más películas:', error);

  } finally {
    loadingText.classList.add('hidden');
    isLoading = false;
    observer.observe(document.getElementById('sentinel'));
  }
}

function initFilters() {
  ['genre-filter', 'order-by-filter', 'rating-filter', 'year-filter'].forEach(id => {
    document.getElementById(id).addEventListener('change', search);
  });
}

document.getElementById('search-input').addEventListener('input', debounce(search, 400));
document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  search();
});

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('movie-modal').addEventListener('click', (e) => {
  if (e.target.id === 'movie-modal') closeModal();
});

async function init() {
  try {
    initTheme();
    initSearchHistory(search);
    await loadGenres();
    initFilters();
    renderHistory(search);
    observer.observe(document.getElementById('sentinel'));
    const data = await getPopularMovies();
    totalPages = data.total_pages;
    renderMovieList(data.results.map(item => new Movie(item)), handleMovieClick);

  } catch (error) {
    console.error('Error al iniciar la app:', error);
  }
}

init();