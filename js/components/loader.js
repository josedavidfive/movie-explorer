export function showSkeletons(n = 10, append = false) {
  const grid = document.getElementById('movies-grid');
  const html = Array(n).fill(`
    <div class="movie-card skeleton">
      <div class="skeleton-img"></div>
    </div>
  `).join('');

  append ? grid.innerHTML += html : grid.innerHTML = html;
}

export function removeSkeletons() {
  document.querySelectorAll('.skeleton').forEach(el => el.remove());
}