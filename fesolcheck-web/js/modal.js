(function () {
  var overlay = document.getElementById('modal-contacto');
  if (!overlay) return;

  var form      = document.getElementById('form-contacto');
  var successEl = document.getElementById('form-success');
  var closeBtn  = overlay.querySelector('.modal-close');

  function openModal() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    var first = overlay.querySelector('input, select, textarea, button');
    if (first) setTimeout(function () { first.focus(); }, 100);
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  window.openModal  = openModal;
  window.closeModal = closeModal;

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      form.querySelectorAll('[required]').forEach(function (field) {
        field.classList.remove('error');
        var empty = field.type === 'checkbox' ? !field.checked : !field.value.trim();
        if (empty) { field.classList.add('error'); valid = false; }
      });

      if (!valid) return;

      var uuid = (typeof crypto !== 'undefined' && crypto.randomUUID)
        ? crypto.randomUUID()
        : Date.now().toString(36) + Math.random().toString(36).slice(2);

      var data = {
        id:           uuid,
        nombre:       form.elements['nombre'].value.trim(),
        empresa:      form.elements['empresa'].value.trim(),
        email:        form.elements['email'].value.trim(),
        telefono:     form.elements['telefono'].value.trim(),
        num_empleados:form.elements['num_empleados'].value,
        mensaje:      form.elements['mensaje'].value.trim(),
        fecha:        new Date().toISOString()
      };

      try {
        var stored = JSON.parse(localStorage.getItem('fesolcheck_contactos') || '[]');
        stored.push(data);
        localStorage.setItem('fesolcheck_contactos', JSON.stringify(stored));
      } catch (_) {}

      fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .catch(function () {})
        .finally(function () {
          showSuccess();
        });
    });
  }

  function showSuccess() {
    if (form)      form.classList.add('hidden');
    if (successEl) successEl.classList.remove('hidden');
    setTimeout(function () {
      closeModal();
    }, 3000);
    setTimeout(function () {
      if (form)      { form.classList.remove('hidden'); form.reset(); }
      if (successEl) successEl.classList.add('hidden');
      form && form.querySelectorAll('.error').forEach(function (el) { el.classList.remove('error'); });
    }, 3400);
  }
})();
