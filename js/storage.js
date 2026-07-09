const STORAGE_KEY = 'aiQuizHistory';

function saveAttempt(attempt) {
  try {
    const history = getRecentAttempts(Infinity);
    history.unshift(attempt);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    console.warn('Unable to save attempt to localStorage:', e);
  }
}

function getRecentAttempts(limit = 10) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const history = JSON.parse(raw);
    if (!Array.isArray(history)) return [];
    return history.slice(0, limit);
  } catch (e) {
    console.warn('Unable to read attempts from localStorage:', e);
    return [];
  }
}
