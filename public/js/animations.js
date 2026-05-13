/**
 * BYGG-KON.ai — Animations layer (GSAP + ScrollTrigger)
 * Loaded after main.js. Adds the "alive" choreography on top.
 */

(() => {
  if (!window.gsap) {
    console.warn('GSAP not loaded — animations disabled');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // Respect reduced motion
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  // -----------------------------------------------------------------
  // SCROLL PROGRESS BAR
  // -----------------------------------------------------------------
  const progress = document.getElementById('scroll-progress');
  if (progress) {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        progress.style.width = (self.progress * 100) + '%';
      }
    });
  }

  // -----------------------------------------------------------------
  // CURSOR SPOTLIGHT — follows mouse, visible only over hero
  // -----------------------------------------------------------------
  const glow = document.getElementById('cursor-glow');
  const hero = document.querySelector('.hero');
  if (glow && hero && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    hero.addEventListener('mouseenter', () => glow.classList.add('on'));
    hero.addEventListener('mouseleave', () => glow.classList.remove('on'));
    hero.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    function trail() {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
      requestAnimationFrame(trail);
    }
    trail();
  }

  // -----------------------------------------------------------------
  // HERO — entrance choreography
  // -----------------------------------------------------------------
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .from('.kicker', { y: 24, opacity: 0, duration: 0.7 })
    .from('.h1', { y: 50, opacity: 0, duration: 1.1 }, '-=0.35')
    .from('.hero .lede', { y: 24, opacity: 0, duration: 0.8 }, '-=0.6')
    .from('.cta-row .btn', { y: 24, opacity: 0, duration: 0.6, stagger: 0.10 }, '-=0.5')
    .from('.counter', { y: 18, opacity: 0, duration: 0.5, stagger: 0.07 }, '-=0.3');

  // Mouse parallax on hero title
  if (hero && window.innerWidth > 768) {
    const h1 = document.querySelector('.h1');
    const kicker = document.querySelector('.kicker');
    hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      gsap.to(h1,     { x, y, duration: 0.9, ease: 'power2.out' });
      gsap.to(kicker, { x: x * 0.3, y: y * 0.3, duration: 0.9, ease: 'power2.out' });
    });
    hero.addEventListener('mouseleave', () => {
      gsap.to([h1, kicker], { x: 0, y: 0, duration: 0.9, ease: 'power2.out' });
    });
  }

  // -----------------------------------------------------------------
  // LOC — dramatic reveal + count up
  // -----------------------------------------------------------------
  const locTotal = document.getElementById('loc-total');
  if (locTotal) {
    ScrollTrigger.create({
      trigger: '.loc',
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.from('.loc-hero-meta', {
          x: -30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out'
        });
        gsap.from('.loc-hero-num', {
          y: 40, opacity: 0, scale: 0.9, duration: 1.1, ease: 'back.out(1.4)'
        });
        // Count up dramatically
        const target = 76200;
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 2.6,
          ease: 'power2.out',
          onUpdate: () => {
            locTotal.textContent = Math.floor(obj.n).toLocaleString('no-NO').replace(/,/g, ' ');
          }
        });
      }
    });
  }

  // -----------------------------------------------------------------
  // SYSTEM MAP — nodes spring in, then connections light up
  // -----------------------------------------------------------------
  ScrollTrigger.create({
    trigger: '.system-map',
    start: 'top 78%',
    once: true,
    onEnter: () => {
      const mapTl = gsap.timeline();
      mapTl
        .from('.system-map', { scale: 0.96, opacity: 0.4, duration: 0.7, ease: 'power3.out' })
        .from('.hub', {
          scale: 0, opacity: 0, duration: 0.7,
          ease: 'back.out(1.7)', transformOrigin: '50% 50%'
        }, '-=0.4')
        .from('.node', {
          scale: 0, opacity: 0, duration: 0.5,
          stagger: { each: 0.08, from: 'random' },
          ease: 'back.out(1.8)', transformOrigin: '50% 50%'
        }, '-=0.4')
        .from('.cn, .cn-flow', {
          opacity: 0, duration: 0.6, stagger: 0.04
        }, '-=0.3')
        .from('.leg', {
          y: 12, opacity: 0, duration: 0.4, stagger: 0.05
        }, '-=0.2');
    }
  });

  // -----------------------------------------------------------------
  // AI cards — staggered float-in
  // -----------------------------------------------------------------
  gsap.from('.ai-card', {
    scrollTrigger: { trigger: '.ai-grid', start: 'top 82%', once: true },
    y: 50, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out'
  });

  // -----------------------------------------------------------------
  // DEMO — tabs + flow board reveal
  // -----------------------------------------------------------------
  gsap.from('.demo .sec-head > *', {
    scrollTrigger: { trigger: '.demo', start: 'top 82%', once: true },
    y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out'
  });
  gsap.from('.dt', {
    scrollTrigger: { trigger: '.demo-tabs', start: 'top 88%', once: true },
    y: 20, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out'
  });
  gsap.from('.flow-board', {
    scrollTrigger: { trigger: '.flow-board', start: 'top 82%', once: true },
    y: 40, opacity: 0, scale: 0.98, duration: 0.9, ease: 'power3.out'
  });
  // Then stagger the columns inside
  gsap.from('.fb-col', {
    scrollTrigger: { trigger: '.flow-board', start: 'top 78%', once: true },
    y: 30, opacity: 0, duration: 0.6, stagger: 0.12, delay: 0.3, ease: 'power3.out'
  });

  // -----------------------------------------------------------------
  // STACK — alternating slide
  // -----------------------------------------------------------------
  gsap.utils.toArray('.layer').forEach((layer, i) => {
    gsap.from(layer, {
      scrollTrigger: { trigger: layer, start: 'top 90%', once: true },
      x: i % 2 === 0 ? -60 : 60,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out'
    });
  });

  // -----------------------------------------------------------------
  // Outputs grid — random stagger
  // -----------------------------------------------------------------
  gsap.from('.out', {
    scrollTrigger: { trigger: '.out-grid', start: 'top 85%', once: true },
    y: 24, opacity: 0, scale: 0.9,
    duration: 0.4,
    stagger: { each: 0.025, from: 'random' },
    ease: 'power3.out'
  });

  // -----------------------------------------------------------------
  // Hilde section — text + screen
  // -----------------------------------------------------------------
  gsap.from('.hilde-text > *', {
    scrollTrigger: { trigger: '.hilde', start: 'top 75%', once: true },
    y: 30, opacity: 0, duration: 0.7, stagger: 0.10, ease: 'power3.out'
  });
  gsap.from('.hilde-screen', {
    scrollTrigger: { trigger: '.hilde', start: 'top 75%', once: true },
    x: 60, opacity: 0, scale: 0.95, duration: 1, ease: 'power3.out'
  });
  gsap.from('.hf', {
    scrollTrigger: { trigger: '.hilde-feat', start: 'top 85%', once: true },
    y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out'
  });

  // -----------------------------------------------------------------
  // Empowerment — halos spring out, card scales up
  // -----------------------------------------------------------------
  gsap.from('.halo', {
    scrollTrigger: { trigger: '.emp', start: 'top 70%', once: true },
    scale: 0, opacity: 0,
    duration: 0.7,
    stagger: { each: 0.08, from: 'start' },
    ease: 'back.out(1.8)',
    transformOrigin: '50% 50%'
  });
  gsap.from('.emp-card', {
    scrollTrigger: { trigger: '.emp', start: 'top 70%', once: true },
    y: 50, opacity: 0, scale: 0.95,
    duration: 0.9, delay: 0.4, ease: 'power3.out'
  });

  // -----------------------------------------------------------------
  // CTA
  // -----------------------------------------------------------------
  gsap.from('.cta-card', {
    scrollTrigger: { trigger: '.cta', start: 'top 82%', once: true },
    y: 40, opacity: 0, scale: 0.97,
    duration: 1, ease: 'power3.out'
  });

  // -----------------------------------------------------------------
  // Section headlines — gentle parallax on scroll
  // -----------------------------------------------------------------
  gsap.utils.toArray('section .h2').forEach(h => {
    gsap.to(h, {
      scrollTrigger: {
        trigger: h,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      },
      y: -24
    });
  });

  // -----------------------------------------------------------------
  // Footer
  // -----------------------------------------------------------------
  gsap.from('.ftr-inner > *', {
    scrollTrigger: { trigger: '.ftr', start: 'top 90%', once: true },
    y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out'
  });

  // -----------------------------------------------------------------
  // MAGNETIC BUTTONS — primary CTAs follow cursor slightly
  // -----------------------------------------------------------------
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.classList.add('magnetic');
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(btn, { x: x * 0.25, y: y * 0.35, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });

  // -----------------------------------------------------------------
  // CARD HOVER LIFT — AI cards & LOC-style cards get a smoother lift
  // -----------------------------------------------------------------
  document.querySelectorAll('.ai-card, .out, .vec-card, .data-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -4, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
    });
  });

  // Refresh ScrollTrigger after fonts load (prevents layout-shift glitches)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
})();
