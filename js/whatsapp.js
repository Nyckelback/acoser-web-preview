/* ═══════════════════════════════════════════════════════════════
   ACOSER Platform — WhatsApp Inteligente
   Genera mensajes estructurados según el contexto del usuario.
   Formato limpio, sin emojis (legible y sin problemas de codificación).
   Úsalo desde cualquier módulo llamando ACOSER_WA.cotizacion(datos)
   ═══════════════════════════════════════════════════════════════ */

const ACOSER_WA = (function () {

  const NUMERO = '573042009677';
  const SITIO  = 'acoser.co';

  /* ── Generador base de URL WhatsApp ── */
  function buildUrl(lineas) {
    const mensaje = lineas.filter(function (l) { return l !== null && l !== undefined; }).join('\n');
    return 'https://wa.me/' + NUMERO + '?text=' + encodeURIComponent(mensaje);
  }

  /* Etiqueta en negrita de WhatsApp: *Etiqueta:* valor */
  function campo(etiqueta, valor) {
    if (!valor && valor !== 0) return null;
    return '*' + etiqueta + ':* ' + valor;
  }

  /* Pie común */
  function pie(ruta) {
    return ['', 'Enviado desde ' + SITIO + (ruta || '')];
  }

  /* ── Mensaje de cotización general ── */
  function cotizacion(datos) {
    const d = datos || {};
    return buildUrl([
      '*Solicitud de cotización · ACOSER*',
      '',
      campo('Nombre', d.nombre),
      campo('Empresa', d.empresa),
      campo('Contacto', d.whatsapp),
      campo('Email', d.email),
      '',
      campo('Prenda', d.tipo),
      campo('Cantidad', d.cantidad ? d.cantidad + ' uds' : null),
      campo('Servicio', d.servicio),
      campo('Detalles', d.detalles),
    ].concat(pie()));
  }

  /* ── Mensaje de calculadora DTF ── */
  function calculadoraDTF(datos) {
    const d = datos || {};
    return buildUrl([
      '*Cálculo DTF · ACOSER*',
      '',
      campo('Nombre', d.nombre),
      campo('Empresa', d.empresa),
      '',
      campo('Ancho', d.ancho ? d.ancho + ' cm' : null),
      campo('Alto', d.alto ? d.alto + ' cm' : null),
      campo('Área', d.area ? d.area + ' cm2' : null),
      campo('Metros lineales', d.metros ? d.metros + ' m' : null),
      campo('Cantidad de estampados', d.cantidad),
      campo('Costo estimado', d.costoEst),
      '',
      'Me interesa cotizar esta impresión DTF.',
    ].concat(pie()));
  }

  /* ── Mensaje del personalizador / mockup ── */
  function personalizador(datos) {
    const d = datos || {};
    return buildUrl([
      '*Diseño personalizado · ACOSER*',
      '',
      campo('Nombre', d.nombre),
      campo('Empresa', d.empresa),
      '',
      campo('Prenda', d.tipoPrenda),
      campo('Color', d.colorPrenda),
      campo('Cantidad', d.cantidad ? d.cantidad + ' uds' : null),
      campo('Ubicación del diseño', d.vista),
      campo('Tamaño', (d.ancho && d.alto) ? d.ancho + 'x' + d.alto + ' cm' : null),
      campo('Nota', d.observacion),
      '',
      'Adjunto mi diseño para revisión.',
    ].concat(pie('/modules/mockup/')));
  }

  /* ── Mensaje portal empresas ── */
  function empresas(datos) {
    const d = datos || {};
    return buildUrl([
      '*Solicitud empresarial · ACOSER*',
      '',
      campo('Empresa', d.empresa),
      campo('NIT', d.nit),
      campo('Contacto', d.nombre),
      campo('Cargo', d.cargo),
      campo('Teléfono', d.whatsapp),
      campo('Email', d.email),
      '',
      campo('Servicio', d.servicio),
      campo('Volumen estimado', d.volumen ? d.volumen + ' uds' : null),
      campo('Frecuencia', d.frecuencia),
      campo('Descripción', d.descripcion),
      '',
      'Solicito propuesta comercial.',
    ].concat(pie('/modules/empresas/')));
  }

  /* ── Mensaje catálogo / producto ── */
  function catalogo(producto) {
    const p = producto || {};
    return buildUrl([
      '*Consulta de producto · ACOSER*',
      '',
      campo('Producto', p.nombre),
      campo('Categoría', p.categoria),
      campo('Referencia', p.referencia),
      '',
      'Estoy interesado en cotizar este producto.',
    ].concat(pie()));
  }

  /* ── Abrir WhatsApp con datos del formulario de cotización ── */
  function desdeFormulario() {
    const get = function (id) {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };
    window.open(cotizacion({
      nombre:   get('f-nombre'),
      empresa:  get('f-empresa'),
      whatsapp: get('f-whatsapp'),
      email:    get('f-email'),
      tipo:     get('f-tipo'),
      cantidad: get('f-cantidad'),
      detalles: get('f-detalles'),
    }), '_blank');
  }

  /* ── API pública ── */
  return {
    cotizacion: cotizacion,
    calculadoraDTF: calculadoraDTF,
    personalizador: personalizador,
    empresas: empresas,
    catalogo: catalogo,
    desdeFormulario: desdeFormulario,
    numero: NUMERO,
  };

})();
