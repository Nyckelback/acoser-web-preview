/* ═══════════════════════════════════════════════════════════════
   ACOSER Platform — Componentes Compartidos
   Renderiza Navbar y Footer en módulos externos.
   Uso: incluir este archivo y llamar ACOSER_UI.renderNav() y
        ACOSER_UI.renderFooter() al inicio del body.
   ═══════════════════════════════════════════════════════════════ */

const ACOSER_UI = (function () {

  /* ── Rutas relativas desde módulos ── */
  const ROOT = '../';

  /* ── Nav HTML ── */
  function getNavHTML(activePage) {
    const links = [
      { href: ROOT + 'index.html#about',     label: 'Nosotros' },
      { href: ROOT + 'index.html#services',  label: 'Servicios' },
      { href: ROOT + 'index.html#process',   label: 'Proceso' },
      { href: ROOT + 'index.html#portfolio', label: 'Portafolio' },
      { href: ROOT + 'modules/catalogo/',    label: 'Catálogo' },
      { href: ROOT + 'modules/empresas/',    label: 'Empresas' },
    ];

    const navItems = links.map(l =>
      `<li><a href="${l.href}"${activePage === l.label ? ' class="active"' : ''}>${l.label}</a></li>`
    ).join('');

    const mobileItems = links.map(l =>
      `<li><a href="${l.href}" onclick="closeMob()">${l.label}</a></li>`
    ).join('');

    return `
<div class="grain"></div>
<div class="cur-dot" id="curDot"></div>
<div class="cur-ring" id="curRing"></div>

<div id="loader">
  <div class="loader-word"><span>ACOSER</span></div>
  <div class="loader-line-wrap"><div class="loader-line-inner"></div></div>
</div>

<a href="https://wa.me/573042009677" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>

<div class="mob-overlay" id="mobOverlay" onclick="closeMob()"></div>
<div class="mob-nav" id="mobNav">
  <button class="mob-close" onclick="closeMob()">Cerrar</button>
  <ul class="mob-nav-links">
    ${mobileItems}
    <li><a href="${ROOT}index.html#contact" onclick="closeMob()">Cotizar</a></li>
  </ul>
</div>

<nav id="nav">
  <div class="nav-inner">
    <a href="${ROOT}index.html" class="nav-logo">
      <img src="${ROOT}imagenes/logo.png" alt="ACOSER" class="nav-logo-img">
    </a>
    <ul class="nav-links">
      ${navItems}
      <li><a href="${ROOT}index.html#contact" class="nav-cta-btn"><span>Cotizar</span></a></li>
    </ul>
    <div class="nav-right">
      <button class="theme-btn" id="themeBtn" aria-label="Cambiar tema">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" id="themeIcon"></svg>
      </button>
      <button class="burger" id="burger" onclick="openMob()" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>`;
  }

  /* ── Footer HTML ── */
  function getFooterHTML() {
    return `
<footer>
  <div class="footer-top">
    <div>
      <span class="footer-brand-name">ACOSER</span>
      <span class="footer-brand-sub">Taller Textil</span>
      <p class="footer-brand-desc">Confeccionamos tus ideas a medida. Producción textil personalizada para marcas, empresas y proyectos en toda Colombia.</p>
    </div>
    <div>
      <span class="footer-col-head">Plataforma</span>
      <ul class="footer-links">
        <li><a href="${ROOT}index.html#about">Quiénes somos</a></li>
        <li><a href="${ROOT}index.html#services">Servicios</a></li>
        <li><a href="${ROOT}modules/catalogo/">Catálogo</a></li>
        <li><a href="${ROOT}modules/empresas/">Empresas</a></li>
        <li><a href="${ROOT}modules/personalizador/">Personalizador</a></li>
      </ul>
    </div>
    <div>
      <span class="footer-col-head">Herramientas</span>
      <ul class="footer-links">
        <li><a href="${ROOT}modules/calculadora-dtf/">Calculadora DTF</a></li>
        <li><a href="${ROOT}modules/portafolio/">Portafolio</a></li>
        <li><a href="${ROOT}modules/recursos/">Centro de recursos</a></li>
      </ul>
    </div>
    <div>
      <span class="footer-col-head">Contacto</span>
      <ul class="footer-links">
        <li><a href="tel:+573042009677">+57 304 200 9677</a></li>
        <li><a href="mailto:acosertallertextil@gmail.com">acosertallertextil@gmail.com</a></li>
        <li><a href="https://instagram.com/acoser_tallertextil" target="_blank">@acoser_tallertextil</a></li>
        <li><a href="#">Corozal &mdash; Sucre, Colombia</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span class="footer-copy">&copy; 2025 <span>ACOSER Taller Textil</span> &mdash; Hecho en Colombia</span>
    <div class="footer-social">
      <a href="https://instagram.com/acoser_tallertextil" target="_blank" class="f-social-link">Instagram</a>
      <a href="https://wa.me/573042009677" target="_blank" class="f-social-link">WhatsApp</a>
    </div>
  </div>
</footer>`;
  }

  /* ── Inyectar nav al inicio del body ── */
  function renderNav(activePage) {
    const placeholder = document.getElementById('acoser-nav');
    if (placeholder) {
      placeholder.outerHTML = getNavHTML(activePage);
    } else {
      document.body.insertAdjacentHTML('afterbegin', getNavHTML(activePage));
    }
  }

  /* ── Inyectar footer al final del body ── */
  function renderFooter() {
    const placeholder = document.getElementById('acoser-footer');
    if (placeholder) {
      placeholder.outerHTML = getFooterHTML();
    } else {
      document.body.insertAdjacentHTML('beforeend', getFooterHTML());
    }
  }

  /* ── Cargar CSS compartido en módulos ── */
  function loadStyles() {
    const styles = [
      ROOT + 'css/base.css',
      ROOT + 'css/modules.css',
    ];
    styles.forEach(href => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet'; link.href = href;
        document.head.appendChild(link);
      }
    });
  }

  return { renderNav, renderFooter, loadStyles, getNavHTML, getFooterHTML };

})();
