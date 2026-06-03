/* ═══════════════════════════════════════════════════════════════
   ACOSER Platform — EmailJS Handler
   Inicialización y envío de formularios.
   ═══════════════════════════════════════════════════════════════ */

(function initEmailJS() {
  if (typeof emailjs === 'undefined') return;
  emailjs.init({ publicKey: 'w2pKrH3klkmxpD0Iq' });
})();

/* ── Formulario de cotización principal ── */
function enviarCotizacion(e) {
  e.preventDefault();

  var nombre   = document.getElementById('f-nombre').value.trim();
  var email    = document.getElementById('f-email').value.trim();
  var errorEl  = document.getElementById('formError');
  var btn      = document.getElementById('btnEnviar');
  var btnTexto = document.getElementById('btnEnviarTexto');

  errorEl.textContent = '';
  if (!nombre) { errorEl.textContent = 'Por favor ingresa tu nombre completo.'; return false; }
  if (!email)  { errorEl.textContent = 'Por favor ingresa tu correo electrónico.'; return false; }

  btn.disabled = true;
  btnTexto.textContent = 'Enviando…';

  /* Capturar lead antes de enviar */
  if (typeof ACOSER_LEADS !== 'undefined') {
    ACOSER_LEADS.desdeFormularioContacto();
  }

  var templateParams = {
    nombre:      nombre,
    empresa:     document.getElementById('f-empresa').value.trim(),
    whatsapp:    document.getElementById('f-whatsapp').value.trim(),
    email:       email,
    tipo_prenda: document.getElementById('f-tipo').value,
    cantidad:    document.getElementById('f-cantidad').value.trim(),
    detalles:    document.getElementById('f-detalles').value.trim(),
  };

  emailjs.send('service_snoqhio', 'template_c9j4is8', templateParams)
    .then(function () {
      var success = document.getElementById('formSuccess');
      if (success) success.classList.add('visible');
      document.getElementById('cotizacionForm').reset();
      btn.disabled = false;
      btnTexto.textContent = 'Solicitar cotización';

      /* Abrir WhatsApp estructurado */
      if (typeof ACOSER_WA !== 'undefined') {
        var url = ACOSER_WA.cotizacion({
          nombre:   nombre,
          empresa:  templateParams.empresa,
          whatsapp: templateParams.whatsapp,
          email:    email,
          tipo:     templateParams.tipo_prenda,
          cantidad: templateParams.cantidad,
          detalles: templateParams.detalles,
        });
        setTimeout(function () { window.open(url, '_blank'); }, 1400);
      }
    })
    .catch(function () {
      errorEl.textContent = 'No se pudo enviar. Por favor escríbenos directamente por WhatsApp.';
      btn.disabled = false;
      btnTexto.textContent = 'Solicitar cotización';
    });

  return false;
}
