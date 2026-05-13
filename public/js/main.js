/**
 * BYGG-KON AI Platform — Frontend interactivity
 * - Sticky header shadow
 * - Subtle hero particle field
 * - Tilt hover on node cards
 * - Counter animation on numbers
 * - Live lot-counter "ticker" on byggkon.ai map
 */

(() => {
  'use strict';

  // -----------------------------------------------------------------
  // Sticky header shadow
  // -----------------------------------------------------------------
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // -----------------------------------------------------------------
  // Hero particle field — slow, soft, technical feel
  // -----------------------------------------------------------------
  const canvas = document.getElementById('particles');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let w, h, particles, dpr;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const hero = canvas.parentElement;
      w = hero.clientWidth;
      h = hero.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      const count = Math.min(80, Math.floor((w * h) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
      }));
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      // links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 12000) {
            const alpha = 1 - d2 / 12000;
            ctx.strokeStyle = `rgba(245, 180, 0, ${alpha * 0.25})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // dots
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.fillStyle = 'rgba(14, 17, 22, 0.55)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(step);
    }

    resize();
    init();
    step();
    window.addEventListener('resize', () => { resize(); init(); });
  }

  // -----------------------------------------------------------------
  // Tilt effect on cards (subtle)
  // -----------------------------------------------------------------
  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // -----------------------------------------------------------------
  // Counter animation
  // -----------------------------------------------------------------
  const counters = document.querySelectorAll('[data-counter]');
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    if (isNaN(target)) return;
    const duration = 1400;
    const start = performance.now();
    const startVal = 0;
    const suffix = el.textContent.replace(/[\d,]/g, '');
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.floor(startVal + (target - startVal) * eased);
      el.textContent = val.toLocaleString('no-NO') + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => io.observe(c));
  } else {
    counters.forEach(animateCounter);
  }

  // -----------------------------------------------------------------
  // Live lot counter ticker on byggkon.ai map
  // -----------------------------------------------------------------
  const lotCounter = document.getElementById('lot-counter');
  if (lotCounter) {
    let val = 247;
    setInterval(() => {
      const delta = Math.floor(Math.random() * 5) - 1; // -1..+3 bias up
      val = Math.max(200, Math.min(420, val + delta));
      lotCounter.textContent = val;
    }, 1800);
  }

  // -----------------------------------------------------------------
  // Smooth-scroll for anchor links (matches CSS scroll-behavior fallback)
  // -----------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
