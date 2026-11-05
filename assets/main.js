// Contact form -> opens the visitor's email app with the message pre-filled
(function () {
  var form = document.getElementById('portfolio-contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('contact-name').value.trim();
      var email = document.getElementById('contact-email').value.trim();
      var msg = document.getElementById('contact-message').value.trim();
      var body = msg + '\n\n— ' + name + (email ? ' (' + email + ')' : '');
      var to = form.getAttribute('data-to');
      window.location.href = 'mailto:' + to + '?subject=' +
        encodeURIComponent('Portfolio enquiry from ' + name) + '&body=' + encodeURIComponent(body);
      document.getElementById('form-feedback').classList.remove('hidden');
    });
  }

  // Highlight the current section in the mobile bottom bar and desktop nav
  var ids = ['top', 'about', 'skills', 'experience', 'projects', 'contact'];
  var active = 'text-primary-container font-bold';
  var links = document.querySelectorAll('nav a[href^="#"]');
  function setActive(id) {
    links.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      if (a.hasAttribute('data-path')) {
        active.split(' ').forEach(function (c) { a.classList.toggle(c, on); });
        a.classList.toggle('text-on-surface-variant', !on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      } else if (a.classList.contains('nav-link')) {
        a.classList.toggle('is-active', on);
      }
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ids.forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }
})();
