/* Theme toggle (day / night) */
(function () {
  function current() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }
  function paint(btn) {
    var dark = current() === 'dark';
    btn.textContent = dark ? '☀️' : '🌙'; /* sun : moon */
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    paint(btn);
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      paint(btn);
    });
  });
})();
