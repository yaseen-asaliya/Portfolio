/* ============================================================
   Space Portfolio — script.js
   ============================================================ */

// ── Starfield Canvas ──────────────────────────────────────────
(function () {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let W, H, stars = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars(n = 220) {
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.3,
        speed: Math.random() * 0.04 + 0.01,
        alpha: Math.random() * 0.7 + 0.3,
        da: (Math.random() - 0.5) * 0.005,
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.alpha += s.da;
      if (s.alpha > 1 || s.alpha < 0.1) s.da *= -1;
      s.y += s.speed;
      if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,220,255,${s.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', () => { resize(); initStars(); });
  resize();
  initStars();
  drawStars();
})();

// ── Typewriter ────────────────────────────────────────────────
(function () {
  const el = document.getElementById('typewriter');
  const lines = [
    'Software Engineer',
    'Backend Developer',
    'DevOps Engineer',
    'AWS Cloud Practitioner',
    'AI Enthusiast',
    'Problem Solver',
  ];
  let li = 0, ci = 0, deleting = false, wait = 0;

  function tick() {
    const line = lines[li];
    if (deleting) {
      ci--;
    } else {
      ci++;
    }
    el.textContent = line.slice(0, ci);

    let delay = deleting ? 50 : 90;

    if (!deleting && ci === line.length) {
      wait++;
      if (wait < 18) { delay = 120; } else { deleting = true; wait = 0; }
    } else if (deleting && ci === 0) {
      deleting = false;
      li = (li + 1) % lines.length;
      delay = 400;
    }
    setTimeout(tick, delay);
  }
  setTimeout(tick, 800);
})();

// ── Nav scroll highlight ──────────────────────────────────────
(function () {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// ── Hamburger Menu ────────────────────────────────────────────
(function () {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });

  document.querySelectorAll('.mob-link').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
})();

// ── Scroll Reveal ─────────────────────────────────────────────
(function () {
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
})();

// ── Active nav link on scroll ─────────────────────────────────
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.style.color = 'var(--accent)';
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => io.observe(s));
})();
