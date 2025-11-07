(function () {
  var burger = document.getElementById('navBurger');
  var menu = document.getElementById('navMenu');
  if (!burger || !menu) return;
  burger.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

// Reveal on scroll
(function () {
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window) || revealEls.length === 0) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function (el) { observer.observe(el); });
})();

// About page background particles (very light)
(function () {
  if ((document.body.dataset && document.body.dataset.page) !== 'about') return;
  var canvas = document.getElementById('bgParticles');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var dpr = Math.max(1, window.devicePixelRatio || 1);
  function resize() {
    var w = window.innerWidth; var h = window.innerHeight;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
  }
  resize();
  window.addEventListener('resize', resize);

  var particles = [];
  var count = Math.min(480, Math.floor((window.innerWidth * window.innerHeight) / 4000));
  for (var i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.12 * dpr,
      vy: (Math.random() - 0.5) * 0.12 * dpr,
      a: 0.12 + Math.random() * 0.15
    });
  }

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + p.a + ')';
      ctx.fill();
    }
    requestAnimationFrame(step);
  }
  step();
})();


