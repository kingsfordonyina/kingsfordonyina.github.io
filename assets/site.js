/* Theme toggle + expandable abstracts */
(function () {
  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  document.addEventListener('DOMContentLoaded', function () {

    /* --- Day / night --- */
    var tbtn = document.getElementById('themeToggle');
    if (tbtn) {
      var paint = function () { tbtn.textContent = currentTheme() === 'dark' ? '☀️' : '🌙'; };
      paint();
      tbtn.addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
        paint();
      });
    }

    /* --- Per-paper abstract toggles --- */
    var toggles = document.querySelectorAll('.abstract-toggle');
    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pub = btn.closest('.pub');
        if (!pub) return;
        var ab = pub.querySelector('.abstract');
        if (!ab) return;
        var open = ab.classList.toggle('is-open');
        btn.textContent = open ? 'Hide abstract' : 'Abstract';
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });

    /* --- Animate News timeline into view --- */
    var newsLists = document.querySelectorAll('.news');
    if ('IntersectionObserver' in window) {
      newsLists.forEach(function (list) {
        var io = new IntersectionObserver(function (entries, obs) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { list.classList.add('animate'); obs.disconnect(); }
          });
        }, { threshold: 0.15 });
        io.observe(list);
      });
    } else {
      newsLists.forEach(function (list) { list.classList.add('animate'); });
    }

    /* --- Show / hide all abstracts --- */
    var showAll = document.getElementById('showAllAbstracts');
    if (showAll) {
      showAll.addEventListener('click', function () {
        var expand = showAll.getAttribute('data-state') !== 'open';
        document.querySelectorAll('.pub:not(.pub--featured) .abstract').forEach(function (ab) {
          ab.classList.toggle('is-open', expand);
        });
        document.querySelectorAll('.abstract-toggle').forEach(function (btn) {
          btn.textContent = expand ? 'Hide abstract' : 'Abstract';
          btn.setAttribute('aria-expanded', expand ? 'true' : 'false');
        });
        showAll.setAttribute('data-state', expand ? 'open' : 'closed');
        showAll.textContent = expand ? 'Hide all abstracts' : 'Show all abstracts';
      });
    }
  });
})();
