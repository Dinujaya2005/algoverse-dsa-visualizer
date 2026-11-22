(() => {
  const toggle = document.getElementById('themeToggle');
  const label = document.getElementById('themeLabel');
  const icon = document.getElementById('themeIcon');
  function sync() {
    const light = document.documentElement.dataset.theme === 'light';
    label.textContent = light ? 'Dark mode' : 'Light mode';
    icon.textContent = light ? '☾' : '☀';
    toggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    toggle.setAttribute('aria-pressed', String(light));
    document.querySelector('meta[name="theme-color"]').content = light ? '#f5f7f2' : '#101816';
  }
  toggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('algoverse-theme', next); } catch (e) {}
    sync();
  });
  sync();
})();
