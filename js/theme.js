// ============================================
// Theme Toggle — Light / Dark
// ============================================

(function () {
  const STORAGE_KEY = 'theme';
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  function getTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return media.matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';
  }

  function updateActive() {
    const current = getTheme();
    document.querySelectorAll('.theme-btn').forEach((btn) => {
      const isActive = btn.dataset.themeValue === current;
      btn.setAttribute('aria-checked', String(isActive));
    });
  }

  function init() {
    applyTheme(getTheme());
    updateActive();

    document.querySelectorAll('.theme-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.themeValue;
        localStorage.setItem(STORAGE_KEY, theme);
        applyTheme(theme);
        updateActive();
      });
    });

    media.addEventListener('change', () => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(getTheme());
        updateActive();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();