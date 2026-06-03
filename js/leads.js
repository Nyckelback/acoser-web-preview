/* ═══════════════════════════════════════════════════════════════
   ACOSER Platform — Sistema de Captura de Leads
   Guarda leads en localStorage y envía notificación por EmailJS.
   Úsalo: ACOSER_LEADS.capturar(datos)
   ═══════════════════════════════════════════════════════════════ */

const ACOSER_LEADS = (function () {

  const STORAGE_KEY = 'acoser_leads';
  const EMAILJS_SERVICE  = 'service_snoqhio';
  const EMAILJS_TEMPLATE = 'template_c9j4is8';

  /* ── Obtener leads guardados ── */
  function getLeads() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  /* ── Guardar un lead en localStorage ── */
  function guardarLocal(lead) {
    const leads = getLeads();
    leads.unshift(lead);
    /* mantener máximo 200 registros locales */
    if (leads.length > 200) leads.splice(200);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch {
      /* cuota llena — ignorar silenciosamente */
    }
  }

  /* ── Enviar lead por EmailJS ── */
  function enviarEmail(lead) {
    if (typeof emailjs === 'undefined') return;
    const templateParams = {
      nombre:      lead.nombre      || '',
      empresa:     lead.empresa     || '',
      whatsapp:    lead.whatsapp    || '',
      email:       lead.email       || '',
      tipo_prenda: lead.servicio    || lead.tipo || '',
      cantidad:    lead.cantidad    || '',
      detalles:    lead.detalles
                    || `Fuente: ${lead.fuente || 'web'} | ${new Date().toLocaleString('es-CO')}`,
    };
    emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, templateParams).catch(() => {
      /* fallo silencioso — el lead ya está en localStorage */
    });
  }

  /* ── Capturar un lead (llamada principal) ── */
  function capturar(datos, opciones) {
    const lead = Object.assign({
      fecha:   new Date().toISOString(),
      fuente:  window.location.pathname,
      pagina:  document.title,
    }, datos);

    guardarLocal(lead);

    const opts = opciones || {};
    if (opts.email !== false) {
      enviarEmail(lead);
    }

    return lead;
  }

  /* ── Capturar desde formulario de contacto ── */
  function desdeFormularioContacto() {
    const get = (id) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };
    return capturar({
      nombre:   get('f-nombre'),
      empresa:  get('f-empresa'),
      whatsapp: get('f-whatsapp'),
      email:    get('f-email'),
      tipo:     get('f-tipo'),
      cantidad: get('f-cantidad'),
      detalles: get('f-detalles'),
      fuente:   'formulario-contacto',
    });
  }

  /* ── Exportar leads a CSV (para uso interno) ── */
  function exportarCSV() {
    const leads = getLeads();
    if (!leads.length) { alert('No hay leads guardados.'); return; }
    const headers = ['fecha', 'nombre', 'empresa', 'whatsapp', 'email', 'tipo', 'servicio', 'cantidad', 'fuente'];
    const rows = leads.map(l =>
      headers.map(h => `"${(l[h] || '').toString().replace(/"/g, '""')}"`).join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `acoser-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ── Obtener resumen rápido ── */
  function resumen() {
    const leads = getLeads();
    const hoy = new Date().toISOString().slice(0, 10);
    return {
      total:    leads.length,
      hoy:      leads.filter(l => l.fecha && l.fecha.startsWith(hoy)).length,
      ultimos5: leads.slice(0, 5),
    };
  }

  /* ── API pública ── */
  return {
    capturar,
    desdeFormularioContacto,
    exportarCSV,
    resumen,
    getLeads,
  };

})();
