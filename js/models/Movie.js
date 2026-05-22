export class Movie {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.overview = data.overview?.length > 100
      ? data.overview.slice(0, 100).trimEnd() + '...'
      : (data.overview || 'Sin sinopsis disponible');
    this.rating = data.vote_average;
    this.poster = data.poster_path;
    this.genreIds = data.genre_ids;
    this.popularity = data.popularity;
    this.year = data.release_date?.slice(0, 4) ?? 'N/A';
  }

  get posterUrl() {
    return this.poster
      ? `https://image.tmdb.org/t/p/w500${this.poster}`
      : 'https://placehold.co/300x450/1e293b/ffffff?text=No+poster';
  }
}