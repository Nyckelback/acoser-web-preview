/* ═══════════════════════════════════════════════════════════════
   ACOSER Platform — Core JS
   Loader · Tema · Cursor · Navbar · Menú móvil · Scroll Reveal
   Contadores · Barra proceso · Filtro portafolio · Testimonios
   Parallax
   ═══════════════════════════════════════════════════════════════ */

/* ─── LOADER ─────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('out');
  }, 700);
});

/* ─── TEMA ───────────────────────────────────────────── */
const themeBtn = document.getElementById('themeBtn');
const html     = document.documentElement;

function setThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (!icon) return;
  if (theme === 'dark') {
    icon.innerHTML = '<circle cx="7.5" cy="7.5" r="3" stroke-width="1.2"/><path d="M7.5 1v1M7.5 13v1M1 7.5h1M13 7.5h1M3.2 3.2l.7.7M10.6 10.6l.7.7M10.6 3.2l-.7.7M3.9 10.6l-.7.7" stroke-width="1.2" stroke-linecap="round"/>';
  } else {
    icon.innerHTML = '<path d="M12.5 8.2A5.2 5.2 0 0 1 7.3 3 5.2 5.2 0 1 0 12.5 8.2z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>';
  }
}

setThemeIcon(html.getAttribute('data-theme') || 'dark');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.add('theme-changing');
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('acoser-theme', next);
    setThemeIcon(next);
    setTimeout(() => document.body.classList.remove('theme-changing'), 650);
  });
}

/* ─── CURSOR ─────────────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('curDot');
  const ring = document.getElementById('curRing');
  if (!dot || !ring) return;
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  if (isTouch) return;

  let mx = 0, my = 0, rx = 0, ry = 0, rafId = null;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    if (!rafId) rafId = requestAnimationFrame(animRing);
  });
  function animRing() {
    rafId = null;
    const dx = mx - rx, dy = my - ry;
    if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
      rx += dx * .14; ry += dy * .14;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      rafId = requestAnimationFrame(animRing);
    }
  }

  const hoverEls = 'a,button,.p-item,.ws-item,.about-media-item,.brand-feat,.service-row,.test-card,.brands-photo-item';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('expand'));
    el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
  });
})();

/* ─── NAVBAR ─────────────────────────────────────────── */
(function initNavbar() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('solid', window.scrollY > 80);
  }, { passive: true });
})();

/* ─── MENÚ MÓVIL ─────────────────────────────────────── */
function openMob() {
  document.getElementById('mobNav').classList.add('open');
  document.getElementById('mobOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMob() {
  document.getElementById('mobNav').classList.remove('open');
  document.getElementById('mobOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── SCROLL REVEAL ──────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.r,.r-left,.r-right,.r-scale');
  if (!els.length) return;
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
    });
  }, { threshold: .08, rootMargin: '0px 0px -48px 0px' });
  els.forEach(el => ro.observe(el));
})();

/* ─── CONTADORES ─────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  const co = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = '1';
        const target = parseInt(e.target.dataset.target);
        const prefix = e.target.dataset.prefix || '';
        const suffix = e.target.dataset.suffix || '';
        let current = 0;
        const step = target / 60;
        const iv = setInterval(() => {
          current = Math.min(current + step, target);
          e.target.textContent = prefix + Math.floor(current) + suffix;
          if (current >= target) clearInterval(iv);
        }, 30);
      }
    });
  }, { threshold: .5 });
  counters.forEach(c => co.observe(c));
})();

/* ─── BARRA PROCESO ──────────────────────────────────── */
(function initProcessBar() {
  const processSection = document.getElementById('process');
  const processBar = document.getElementById('processBar');
  if (!processSection || !processBar) return;
  const pbo = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { processBar.style.width = '100%'; pbo.disconnect(); }
  }, { threshold: .2 });
  pbo.observe(processSection);
})();

/* ─── FILTRO PORTAFOLIO ──────────────────────────────── */
function pFilter(cat, btn) {
  document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('on'));
  if (btn) btn.classList.add('on');
  document.querySelectorAll('.p-item').forEach(item => {
    const match = cat === 'all' || item.dataset.c === cat;
    item.style.opacity = match ? '1' : '0.12';
    item.style.pointerEvents = match ? 'auto' : 'none';
  });
}

/* ─── TESTIMONIOS ────────────────────────────────────── */
let tidx = 0;
function moveTest(dir) {
  const track = document.getElementById('testTrack');
  if (!track) return;
  const cards = track.querySelectorAll('.test-card');
  const perView = window.innerWidth < 768 ? 1 : 2;
  const maxIdx = Math.max(0, cards.length - perView);
  tidx = Math.max(0, Math.min(tidx + dir, maxIdx));
  const cardW = cards[0].offsetWidth + 24;
  track.style.transform = `translateX(-${tidx * cardW}px)`;
  const bar = document.getElementById('tcBar');
  if (bar) bar.style.width = ((tidx / maxIdx) * 100 || 50) + '%';
}

/* Parallax removido — causaba layout repaints en cada scroll */

/* ─── FORM SUCCESS ───────────────────────────────────── */
function cerrarExito() {
  const el = document.getElementById('formSuccess');
  if (el) el.classList.remove('visible');
}
