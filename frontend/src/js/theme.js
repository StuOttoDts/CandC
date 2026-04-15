export function setupTheme(toggleBtn) {

  function setTheme(isDark) {
    document.body.classList.toggle('dark', isDark);
    toggleBtn.innerHTML = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark ? '1' : '0');
  }

  function init() {
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(saved === '1' || (saved === null && prefersDark));
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark');
    setTheme(isDark);
  });

  return { init };
}