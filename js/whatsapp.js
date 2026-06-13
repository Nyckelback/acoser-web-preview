/* ═══════════════════════════════════════════════════════════════
   ACOSER Platform — WhatsApp Inteligente
   Genera mensajes estructurados según el contexto del usuario.
   Úsalo desde cualquier módulo llamando ACOSER_WA.enviar(datos)
   ═══════════════════════════════════════════════════════════════ */

const ACOSER_WA = (function () {

  const NUMERO = '573042009677';

  /* ── Generador base de URL WhatsApp ── */
  function buildUrl(mensaje) {
    return 'https://wa.me/' + NUMERO + '?text=' + encodeURIComponent(mensaje);
  }

  /* ── Separador visual ── */
  const SEP = '━━━━━━━━━━━━━━━━━━━━';

  /* ── Mensaje de cotización general ── */
  function cotizacion(datos) {
    const d = datos || {};
    const lineas = [
      '🧵 *Solicitud de cotización — ACOSER*',
      SEP,
      d.nombre   ? `👤 Nombre: ${d.nombre}`          : null,
      d.empresa  ? `🏢 Empresa: ${d.empresa}`         : null,
      d.whatsapp ? `📱 Contacto: ${d.whatsapp}`       : null,
      d.email    ? `📧 Email: ${d.email}`              : null,
      SEP,
      d.tipo     ? `👕 Prenda: ${d.tipo}`             : null,
      d.cantidad ? `🔢 Cantidad: ${d.cantidad} uds`   : null,
      d.servicio ? `⚙️ Servicio: ${d.servicio}`       : null,
      d.detalles ? `📝 Detalles: ${d.detalles}`       : null,
      SEP,
      '🌐 Enviado desde: acoser-web.vercel.app',
    ].filter(Boolean).join('\n');

    return buildUrl(lineas);
  }

  /* ── Mensaje de calculadora DTF ── */
  function calculadoraDTF(datos) {
    const d = datos || {};
    const lineas = [
      '📐 *Cálculo DTF — ACOSER*',
      SEP,
      d.nombre     ? `👤 Nombre: ${d.nombre}`                  : null,
      d.empresa    ? `🏢 Empresa: ${d.empresa}`                : null,
      SEP,
      d.ancho      ? `↔️ Ancho: ${d.ancho} cm`                 : null,
      d.alto       ? `↕️ Alto: ${d.alto} cm`                   : null,
      d.area       ? `📏 Área: ${d.area} cm²`                  : null,
      d.metros     ? `🗂️ Metros lineales: ${d.metros} m`       : null,
      d.cantidad   ? `🔢 Cantidad de estampados: ${d.cantidad}` : null,
      d.costoEst   ? `💰 Costo estimado: ${d.costoEst}`        : null,
      SEP,
      'Me interesa cotizar esta impresión DTF.',
      '🌐 acoser-web.vercel.app',
    ].filter(Boolean).join('\n');

    return buildUrl(lineas);
  }

  /* ── Mensaje del personalizador ── */
  function personalizador(datos) {
    const d = datos || {};
    const lineas = [
      '🎨 *Diseño personalizado — ACOSER*',
      SEP,
      d.nombre      ? `👤 Nombre: ${d.nombre}`           : null,
      d.empresa     ? `🏢 Empresa: ${d.empresa}`          : null,
      SEP,
      d.tipoPrenda  ? `👕 Prenda: ${d.tipoPrenda}`        : null,
      d.colorPrenda ? `🎨 Color: ${d.colorPrenda}`        : null,
      d.cantidad    ? `🔢 Cantidad: ${d.cantidad} uds`    : null,
      d.vista       ? `🖼️ Ubicación diseño: ${d.vista}`   : null,
      d.ancho       ? `↔️ Tamaño: ${d.ancho}×${d.alto} cm` : null,
      d.observacion ? `📝 Nota: ${d.observacion}`         : null,
      SEP,
      'Adjunto mi diseño para revisión.',
      '🌐 acoser-web.vercel.app/modules/mockup/',
    ].filter(Boolean).join('\n');

    return buildUrl(lineas);
  }

  /* ── Mensaje portal empresas ── */
  function empresas(datos) {
    const d = datos || {};
    const lineas = [
      '🏢 *Solicitud empresarial — ACOSER*',
      SEP,
      d.empresa       ? `🏢 Empresa: ${d.empresa}`             : null,
      d.nit           ? `📋 NIT: ${d.nit}`                     : null,
      d.nombre        ? `👤 Contacto: ${d.nombre}`             : null,
      d.cargo         ? `💼 Cargo: ${d.cargo}`                  : null,
      d.whatsapp      ? `📱 Tel: ${d.whatsapp}`                : null,
      d.email         ? `📧 Email: ${d.email}`                  : null,
      SEP,
      d.servicio      ? `⚙️ Servicio: ${d.servicio}`            : null,
      d.volumen       ? `📦 Volumen estimado: ${d.volumen} uds` : null,
      d.frecuencia    ? `🔄 Frecuencia: ${d.frecuencia}`       : null,
      d.descripcion   ? `📝 Descripción: ${d.descripcion}`     : null,
      SEP,
      'Solicito propuesta comercial.',
      '🌐 acoser-web.vercel.app/modules/empresas/',
    ].filter(Boolean).join('\n');

    return buildUrl(lineas);
  }

  /* ── Mensaje catálogo ── */
  function catalogo(producto) {
    const p = producto || {};
    const lineas = [
      '🛍️ *Consulta de producto — ACOSER*',
      SEP,
      p.nombre    ? `👕 Producto: ${p.nombre}`   : null,
      p.categoria ? `📂 Categoría: ${p.categoria}` : null,
      p.referencia ? `🏷️ Ref: ${p.referencia}`  : null,
      SEP,
      'Estoy interesado en cotizar este producto.',
      '🌐 acoser-web.vercel.app',
    ].filter(Boolean).join('\n');

    return buildUrl(lineas);
  }

  /* ── Abrir WhatsApp con datos del formulario de cotización ── */
  function desdeFormulario() {
    const get = (id) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };
    const datos = {
      nombre:   get('f-nombre'),
      empresa:  get('f-empresa'),
      whatsapp: get('f-whatsapp'),
      email:    get('f-email'),
      tipo:     get('f-tipo'),
      cantidad: get('f-cantidad'),
      detalles: get('f-detalles'),
    };
    window.open(cotizacion(datos), '_blank');
  }

  /* ── API pública ── */
  return {
    cotizacion,
    calculadoraDTF,
    personalizador,
    empresas,
    catalogo,
    desdeFormulario,
    numero: NUMERO,
  };

})();
