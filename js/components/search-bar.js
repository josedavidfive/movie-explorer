import { getHistory } from '../services/storage-service.js';

export function initSearchHistory(onSearch) {
  const input = document.getElementById('search-input');
  const container = document.getElementById('search-history');

  input.addEventListener('focus', () => {
    renderHistory(onSearch);
    if (getHistory().length) container.classList.add('visible');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) container.classList.remove('visible');
  });
}

export function renderHistory(onSearch) {
  const container = document.getElementById('search-history');
  const history = getHistory();

  if (!history.length) {
    container.classList.remove('visible');
    return;
  }

  container.innerHTML = history
    .map(q => `<span class="history-item">${q}</span>`)
    .join('');

  container.querySelectorAll('.history-item').forEach(el => {
    el.addEventListener('click', () => {
      document.getElementById('search-input').value = el.textContent;
      container.classList.remove('visible');
      onSearch();
    });
  });
}