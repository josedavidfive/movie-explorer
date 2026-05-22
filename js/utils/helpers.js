// Filtra un array de películas localmente por género, rating y año
export function filterMovies(movies, { genre, rating, year }) {
  return movies.filter(movie => {
    if (genre && !movie.genreIds.includes(Number(genre))) return false;
    if (rating && movie.rating < Number(rating)) return false;
    if (year && movie.year < year) return false;
    return true;
  });
}

// Ordena un array de películas localmente por el criterio elegido
export function sortMovies(movies, sortBy) {
  const sorted = [...movies];
  switch (sortBy) {
    case 'popularity.desc': return sorted.sort((a, b) => b.popularity - a.popularity);
    case 'popularity.asc': return sorted.sort((a, b) => a.popularity - b.popularity);
    case 'vote_average.desc': return sorted.sort((a, b) => b.rating - a.rating);
    case 'vote_average.asc': return sorted.sort((a, b) => a.rating - b.rating);
    default: return sorted;
  }
}