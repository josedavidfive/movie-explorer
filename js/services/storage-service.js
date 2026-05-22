const HISTORY_KEY = 'movie-explorer-history';
const MAX_HISTORY = 10;

export function getHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
}

export function addToHistory(query) {
  const history = getHistory().filter(item => item !== query);
  history.unshift(query);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}