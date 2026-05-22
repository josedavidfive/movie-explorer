import { renderMap } from '../services/map-service.js';

const NO_ACTOR = 'https://placehold.co/185x185/1e293b/ffffff?text=?';

export function openModal(html) {
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('movie-modal').classList.remove('hidden');
}

export function closeModal() {
  document.getElementById('movie-modal').classList.add('hidden');
}

function buildTrailer(videos) {
  const trailer = videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  if (!trailer) return '<p class="no-providers">Trailer no disponible</p>';
  return `
    <div class="modal-section">
      <h3>Trailer</h3>
      <div class="modal-trailer">
        <iframe src="https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1"
          allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
        </iframe>
      </div>
    </div>`;
}

function buildCast(credits) {
  if (!credits.cast?.length) return '<p class="no-providers">Reparto no disponible</p>';
  return credits.cast.slice(0, 8).map(actor => `
    <div class="actor">
      <img src="${actor.profile_path
      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
      : NO_ACTOR}"
        alt="${actor.name}"
        onerror="this.src='${NO_ACTOR}'">
      <span>${actor.name}</span>
    </div>`
  ).join('');
}

function buildProviders(providers) {
  const list = providers.results?.ES?.flatrate || [];
  if (!list.length) return '<p class="no-providers">No disponible en streaming en España</p>';
  return `
    <div class="modal-providers">
      ${list.map(p => `
        <img src="https://image.tmdb.org/t/p/w45${p.logo_path}" alt="${p.provider_name}" title="${p.provider_name}">
      `).join('')}
    </div>`;
}

export function buildModalHTML({ movie, credits, videos, providers }) {
  setTimeout(() => renderMap(movie.production_countries || []), 100);

  return `
    ${buildTrailer(videos)}
    <div class="modal-section">
      <h3>Reparto</h3>
      <div class="modal-cast">${buildCast(credits)}</div>
    </div>
    <div class="modal-section">
      <h3>Disponible en España</h3>
      ${buildProviders(providers)}
    </div>
    <div class="modal-section">
      <h3>Países de producción</h3>
      <div id="modal-map" style="height: 220px; border-radius: 12px;"></div>
    </div>
  `;
}