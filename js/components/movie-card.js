export function MovieCard(movie) {
  const rating = movie.rating ? movie.rating.toFixed(1) : 'N/A';
  return `
    <div class="movie-card" data-id="${movie.id}">
      <img src="${movie.posterUrl}" alt="Poster de ${movie.title}"
        onerror="this.src='https://placehold.co/300x450/1e293b/ffffff?text=Sin+poster'">
      <div class="movie-card__overlay">
        <div class="movie-card__info">
          <h3 class="movie-card__title">${movie.title}</h3>
          <span class="movie-card__year">${movie.year} · ⭐ ${rating}</span>
        </div>
        <p class="movie-card__overview">${movie.overview}</p>
      </div>
    </div>
  `;
}