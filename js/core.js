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

/* ─── CURSOR TIJERAS DE SASTRE ───────────────────────── */
/* Tijeras doradas orientadas como el puntero (punta arriba-izquierda).
   Abren un poco sobre elementos clicables y "cortan" en cada clic. */
(function initCursor() {
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  if (isTouch) return;
  /* Las páginas tipo studio (mockup, tallas) usan cursor nativo: no inyectar */
  if (getComputedStyle(document.body).cursor !== 'none') return;

  const sc = document.createElement('div');
  sc.id = 'curScissors';
  sc.setAttribute('aria-hidden', 'true');
  sc.innerHTML =
    '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">' +
      '<g class="sc-half sc-a">' +
        '<path class="sc-blade" d="M3 3 L7.6 4.2 Q14.2 8.4 16.4 15.2 L15.2 16.4 Q10.4 12.2 5.2 6.6 Z"/>' +
        '<ellipse class="sc-handle" cx="22.6" cy="24.8" rx="4" ry="2.7" transform="rotate(38 22.6 24.8)"/>' +
        '<path class="sc-blade" d="M15.6 16 L16.4 15.2 L20.4 20.6 L18.9 21.6 Z"/>' +
      '</g>' +
      '<g class="sc-half sc-b">' +
        '<path class="sc-blade" d="M3 3 L4.2 7.6 Q8.4 14.2 15.2 16.4 L16.4 15.2 Q12.2 10.4 6.6 5.2 Z"/>' +
        '<ellipse class="sc-handle" cx="24.8" cy="22.6" rx="2.7" ry="4" transform="rotate(38 24.8 22.6)"/>' +
        '<path class="sc-blade" d="M16 15.6 L15.2 16.4 L20.6 20.4 L21.6 18.9 Z"/>' +
      '</g>' +
      '<circle class="sc-pivot" cx="16" cy="16" r="1.7"/>' +
    '</svg>';
  document.body.appendChild(sc);

  /* La punta de las tijeras (3,3 del viewBox de 32 a 30px) cae en el mouse */
  const TIP = 3 * (34 / 32);
  document.addEventListener('mousemove', e => {
    sc.style.transform = 'translate(' + (e.clientX - TIP) + 'px,' + (e.clientY - TIP) + 'px)';
  }, { passive: true });

  /* Snip al hacer clic */
  let snipT = null;
  document.addEventListener('mousedown', () => {
    sc.classList.add('snip');
  });
  document.addEventListener('mouseup', () => {
    clearTimeout(snipT);
    snipT = setTimeout(() => sc.classList.remove('snip'), 90);
  });

  /* Abrir sobre clicables */
  const hoverEls = 'a,button,.p-item,.ws-item,.about-media-item,.brand-feat,.service-row,.test-card,.brands-photo-item,.svc-line,.quick-card,.g-item,.tool-chip,summary,input,select,textarea,label';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => sc.classList.add('open'));
    el.addEventListener('mouseleave', () => sc.classList.remove('open'));
  });

  /* Ocultar al salir de la ventana */
  document.addEventListener('mouseleave', () => { sc.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { sc.style.opacity = '1'; });
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
