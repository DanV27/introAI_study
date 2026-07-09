(function () {
  const THEME_KEY = 'aiQuizTheme';

  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {
      // localStorage unavailable — fall through to media query
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  applyTheme(getPreferredTheme());

  function updateToggleButton(btn, theme) {
    btn.textContent = theme === 'dark' ? '☀' : '☾';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  window.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    updateToggleButton(btn, current);

    btn.addEventListener('click', function () {
      const now = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(now);
      try {
        localStorage.setItem(THEME_KEY, now);
      } catch (e) {
        // ignore
      }
      updateToggleButton(btn, now);
    });
  });
})();
