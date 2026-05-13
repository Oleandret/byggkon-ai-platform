/**
 * BYGG-KON.ai — futuristic frontend
 * - Persistent network background canvas
 * - Sticky header shadow
 * - Live counters
 * - Modal system (click AI nodes / cards / pills → pipeline detail)
 */

(() => {
  'use strict';

  // -------------------------------------------------------------
  // STICKY HEADER
  // -------------------------------------------------------------
  const hdr = document.getElementById('hdr');
  const onScroll = () => {
    if (window.scrollY > 8) hdr.classList.add('scr');
    else hdr.classList.remove('scr');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // -------------------------------------------------------------
  // NETWORK BACKGROUND CANVAS
  // Connected nodes drifting slowly — futuristic / "AI" vibe
  // -------------------------------------------------------------
  const cv = document.getElementById('bg-network');
  if (cv && cv.getContext) {
    const ctx = cv.getContext('2d');
    let w, h, dpr, particles;
    const palette = ['#c8102e', '#f5b400', '#0a6cf0', '#7a3fc8', '#ff6b35', '#1f8a3a', '#f5b400'];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = w + 'px';
      cv.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function init() {
      const n = Math.min(70, Math.floor((w * h) / 22000));
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.5 + 0.6,
        c: palette[Math.floor(Math.random() * palette.length)],
      }));
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      // links — subtle on light bg
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 18000) {
            const alpha = (1 - d2 / 18000) * 0.10;
            ctx.strokeStyle = `rgba(10, 14, 22, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // particles — subtle
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      requestAnimationFrame(tick);
    }
    resize();
    init();
    tick();
    window.addEventListener('resize', () => { resize(); init(); });
  }

  // -------------------------------------------------------------
  // MODAL SYSTEM
  // -------------------------------------------------------------
  const root = document.getElementById('modal-root');
  function openModal(id) {
    if (!root) return;
    // hide all first
    root.querySelectorAll('.modal').forEach(m => m.classList.remove('show'));
    const target = root.querySelector(`[data-modal-id="${id}"]`);
    if (!target) return;
    target.classList.add('show');
    root.classList.add('open');
    root.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // restart pipe-arrow animation
    target.querySelectorAll('.pipe-arrow').forEach(el => {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    });
  }
  function closeModal() {
    if (!root) return;
    root.classList.remove('open');
    root.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal]').forEach(el => {
    const id = el.getAttribute('data-modal');
    el.addEventListener('click', (e) => {
      // SVG <g> elements inside the map are clickable; allow keyboard too
      e.preventDefault();
      openModal(id);
    });
    // keyboard support for SVG buttons
    if (el.getAttribute('role') === 'button' || el.tagName === 'BUTTON') {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(id);
        }
      });
    }
  });
  document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root && root.classList.contains('open')) closeModal();
  });

  // -------------------------------------------------------------
  // LIVE COUNTERS
  // -------------------------------------------------------------

  // Hero counter "År" — count up from 0 to 40 once
  const yearsEl = document.querySelector('[data-counter="40"]');
  if (yearsEl) {
    const dur = 1400;
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      yearsEl.textContent = Math.floor(eased * 40);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Hero "Prosjekter" — ticks up roughly every second
  const projEl = document.getElementById('hero-projects');
  if (projEl) {
    let value = 4000;
    setInterval(() => {
      if (Math.random() < 0.55) {
        value += 1;
        projEl.textContent = value.toLocaleString('no-NO') + '+';
        projEl.classList.add('pulse-yellow');
        setTimeout(() => projEl.classList.remove('pulse-yellow'), 400);
      }
    }, 1000);
  }

  // Hero embeddings counter — fast ticking
  const embEl = document.getElementById('hero-embeds');
  if (embEl) {
    let v = 2.40;
    setInterval(() => {
      v += Math.random() * 0.0008;
      embEl.textContent = v.toFixed(2).replace('.', ',') + 'M';
    }, 900);
  }

  // Loki vector embedding ticker (in stack section)
  const lokiEmb = document.getElementById('loki-emb');
  if (lokiEmb) {
    let v = 2.40;
    setInterval(() => {
      v += Math.random() * 0.001;
      lokiEmb.textContent = v.toFixed(2).replace('.', ',') + 'M';
    }, 1100);
  }

  // LOC: animate each system card on scroll into view
  const locCards = document.querySelectorAll('[data-loc]');
  if (locCards.length && 'IntersectionObserver' in window) {
    const fmt = (n) => n.toLocaleString('no-NO').replace(/,/g, ' ');
    const animateLoc = (el) => {
      const target = parseInt(el.getAttribute('data-loc'), 10);
      const dur = 1600;
      const start = performance.now();
      function tick(now) {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = fmt(Math.floor(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateLoc(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    locCards.forEach(c => io.observe(c));
  }

  // LOC total — ticks up periodically to feel alive
  const locTotal = document.getElementById('loc-total');
  const heroLoc = document.getElementById('hero-loc');
  if (locTotal) {
    let v = 76200;
    const fmtTot = (n) => n.toLocaleString('no-NO').replace(/,/g, ' ');
    setInterval(() => {
      // Random small bumps — like real commits coming in
      if (Math.random() < 0.4) {
        v += Math.floor(Math.random() * 4) + 1;
        locTotal.textContent = fmtTot(v);
        if (heroLoc) heroLoc.textContent = fmtTot(v) + '+';
      }
    }, 1500);
  }

  // Hilde live lot counter
  const lotEl = document.getElementById('lot-counter');
  if (lotEl) {
    let v = 247;
    setInterval(() => {
      const d = Math.floor(Math.random() * 5) - 1;
      v = Math.max(220, Math.min(420, v + d));
      lotEl.textContent = v;
    }, 1800);
  }

  // -------------------------------------------------------------
  // DEMO PIPELINE — tab-driven flow board
  // -------------------------------------------------------------
  const flows = {
    dispensasjon: {
      input: 'Lag søknad om dispensasjon fra TEK17 §13-7 for prosjekt Solås.',
      agents: {
        loki:  { active: true,  task: 'Tidligere disp-søknader (3 funn)' },
        nova:  { active: true,  task: 'PBL §19-2 · TEK17 §13-7' },
        hilde: { active: true,  task: 'Gnr/bnr · eier verifisert' },
        tt:    { active: true,  task: 'Prosjektnr 4072 hentet' },
        fx:    { active: true,  task: 'Sender til byggherre + kommune' },
        ki:    { active: false, task: '—' },
      },
      claudeAction: 'Komponerer søknad i BYGG-KON-mal',
      claudeSteps: ['Strukturerer dokumentet', 'Henter kildehenvisninger', 'Formaterer i mal'],
      output: {
        ico: '📜',
        name: 'Dispensasjonssøknad.pdf',
        meta: '4 sider · BYGG-KON-mal · klar til signatur',
        actions: ['→ Sendt via Epostagent til byggherre', '→ Arkivert i prosjektmappe'],
        time: 38,
      },
    },
    uak: {
      input: 'Lag UAK-sjekkliste for våtrom i prosjekt Steinerskolen.',
      agents: {
        loki:  { active: true,  task: 'BYGG-KONs UAK-maler for våtrom' },
        nova:  { active: true,  task: 'TEK17 §13 · NS 3420-T · BVN 31.110' },
        hilde: { active: false, task: '—' },
        tt:    { active: true,  task: 'Prosjektnr + kontrollansvarlig' },
        fx:    { active: false, task: '—' },
        ki:    { active: false, task: '—' },
      },
      claudeAction: 'Bygger kontrollpunkter med referanser',
      claudeSteps: ['Velger relevante kontrollpunkter', 'Knytter mot fagregelverk', 'Sorterer etter fase'],
      output: {
        ico: '✅',
        name: 'UAK-sjekkliste-Vatrom.pdf',
        meta: '32 kontrollpunkter · 6 sider · signaturlinjer',
        actions: ['→ Distribuert til UAK-foretak', '→ Lagt inn i Loki for læring'],
        time: 22,
      },
    },
    ks: {
      input: 'Lag KS-plan for betongprosjektering — enebolig på Solåsen, prosjekt 4118.',
      agents: {
        loki:  { active: true,  task: 'Tidligere enebolig-KS-planer' },
        nova:  { active: true,  task: 'NS-EN 1992 · TEK17 §10 · NS 3473' },
        hilde: { active: true,  task: 'Tomt + grunnforhold hentet' },
        tt:    { active: true,  task: 'Prosjektnr · timepriser · ansvarlig' },
        fx:    { active: false, task: '—' },
        ki:    { active: false, task: '—' },
      },
      claudeAction: 'Komponerer komplett KS-plan i BYGG-KON-mal',
      claudeSteps: ['Identifiserer risikopunkter', 'Knytter kontrollpunkter til Eurokode 2', 'Lager kontrollplan + signaturer'],
      output: {
        ico: '🧱',
        name: 'KS-plan-Betong-4118.pdf',
        meta: '12 sider · NS 3473 · 24 kontrollpunkter',
        actions: ['→ Sendt til kvalitetsleder', '→ Arkivert i KS-systemet'],
        time: 51,
      },
    },
    befaring: {
      input: 'Skriv befaringsrapport — stålknutepunkt på prosjekt Interwell 4072.',
      agents: {
        loki:  { active: true,  task: 'Beste praksis fra tidligere stålbefaringer' },
        nova:  { active: true,  task: 'NS-EN 1090 · NS-EN 1993 · TEK17 §10' },
        hilde: { active: false, task: '—' },
        tt:    { active: true,  task: 'Prosjekt + UAK-historikk' },
        fx:    { active: true,  task: 'Henter befaringsnotater fra e-post' },
        ki:    { active: false, task: '—' },
      },
      claudeAction: 'Bygger befaringsrapport med funn + tiltak',
      claudeSteps: ['Klassifiserer avvik etter alvorlighet', 'Anbefaler tiltak per knutepunkt', 'Foto-referanser knyttet'],
      output: {
        ico: '🔧',
        name: 'Befaringsrapport-stal-4072.pdf',
        meta: '8 sider · 14 funn · 3 avvik · 11 godkjent',
        actions: ['→ Sendt til byggherre + utførende', '→ Avvik logget til oppfølging'],
        time: 33,
      },
    },
  };

  const flowInput        = document.getElementById('flow-input');
  const flowClaudeAction = document.getElementById('flow-claude-action');
  const flowClaudeSteps  = document.getElementById('flow-claude-steps');
  const flowOutputIco    = document.getElementById('flow-output-ico');
  const flowOutputName   = document.getElementById('flow-output-name');
  const flowOutputMeta   = document.getElementById('flow-output-meta');
  const flowOutputActs   = document.getElementById('flow-output-actions');
  const flowTime         = document.getElementById('flow-time');

  function fade(el, fn) {
    if (!el) return;
    el.style.transition = 'opacity .2s ease';
    el.style.opacity = '0';
    setTimeout(() => { fn(); el.style.opacity = '1'; }, 200);
  }

  function applyFlow(key) {
    const f = flows[key];
    if (!f) return;

    // Input
    fade(flowInput, () => { flowInput.textContent = f.input; });

    // Agents
    Object.entries(f.agents).forEach(([agent, data]) => {
      const card = document.querySelector(`.fb-agent[data-agent="${agent}"]`);
      const task = document.querySelector(`[data-task="${agent}"]`);
      if (card) card.classList.toggle('active', data.active);
      if (task) {
        task.style.transition = 'opacity .2s ease';
        task.style.opacity = '0';
        setTimeout(() => { task.textContent = data.task; task.style.opacity = '1'; }, 200);
      }
      // Connectors
      document.querySelectorAll(`[data-line="${agent}"]`).forEach(line => {
        line.classList.toggle('active', data.active);
        const colorMap = {
          loki: '#c8102e', nova: '#f5b400', hilde: '#0a6cf0',
          tt: '#7a3fc8', fx: '#ff6b35', ki: '#1f8a3a'
        };
        line.style.setProperty('--c-active', colorMap[agent]);
      });
    });

    // Claude
    fade(flowClaudeAction, () => { flowClaudeAction.textContent = f.claudeAction; });
    if (flowClaudeSteps) {
      // re-render with re-triggered animation
      flowClaudeSteps.innerHTML = '';
      void flowClaudeSteps.offsetWidth;
      f.claudeSteps.forEach(s => {
        const li = document.createElement('li');
        li.textContent = s;
        flowClaudeSteps.appendChild(li);
      });
    }

    // Output
    fade(flowOutputIco, () => { flowOutputIco.textContent = f.output.ico; });
    fade(flowOutputName, () => { flowOutputName.textContent = f.output.name; });
    fade(flowOutputMeta, () => { flowOutputMeta.textContent = f.output.meta; });
    if (flowOutputActs) {
      flowOutputActs.innerHTML = '';
      f.output.actions.forEach(a => {
        const li = document.createElement('li');
        li.textContent = a;
        flowOutputActs.appendChild(li);
      });
    }
    if (flowTime) {
      const start = parseInt(flowTime.textContent, 10) || 0;
      const target = f.output.time;
      const dur = 600;
      const t0 = performance.now();
      function tick(now) {
        const t = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        flowTime.textContent = Math.round(start + (target - start) * eased);
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  }

  document.querySelectorAll('.dt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dt').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      applyFlow(btn.getAttribute('data-flow'));
    });
  });

  // Initial state
  applyFlow('dispensasjon');

  // -------------------------------------------------------------
  // SMOOTH SCROLL
  // -------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length < 2) return;
      const t = document.querySelector(href);
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
