/* ═══════════════════════════════════════════════════════════
   funcionamiento.js — FesolCheck · Arquitectura & Funcionamiento
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. STICKY SUBMENU + INTERSECTION OBSERVER ── */
  const sections    = document.querySelectorAll('.func-section[id]');
  const subLinks    = document.querySelectorAll('.func-submenu a[href^="#"]');
  const submenu     = document.getElementById('func-submenu');
  const navbar      = document.getElementById('navbar');

  function updateActiveLink(id) {
    subLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
  }

  if (sections.length && subLinks.length) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) updateActiveLink(e.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    sections.forEach(s => io.observe(s));
  }

  /* ── 2. TABS DE TESTING ── */
  function initTabs(barSelector, panelSelector) {
    const bars   = document.querySelectorAll(barSelector);
    bars.forEach(bar => {
      const btns   = bar.querySelectorAll('.tab-btn');
      const group  = bar.dataset.tabGroup;
      const panels = document.querySelectorAll(`[data-tab-group="${group}"]`);

      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.tab;

          btns.forEach(b => b.classList.remove('tab-active'));
          btn.classList.add('tab-active');

          panels.forEach(p => {
            if (p.classList.contains('tab-panel')) {
              p.classList.toggle('tab-visible', p.dataset.tabId === target);
            }
          });
        });
      });
    });
  }

  initTabs('.tabs-bar[data-tab-group]', '.tab-panel');

  /* ── 3. TABS DE DOCUMENTACIÓN ── */
  document.querySelectorAll('.doc-panel').forEach(panel => {
    const btns   = panel.querySelectorAll('.doc-tab-btn');
    const panes  = panel.querySelectorAll('.doc-tab-pane');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.docTab;
        btns.forEach(b => b.classList.remove('doc-tab-active'));
        btn.classList.add('doc-tab-active');
        panes.forEach(p => {
          p.style.display = p.dataset.docPane === target ? 'block' : 'none';
        });
      });
    });

    /* Mostrar primera pestaña por defecto */
    if (btns.length) btns[0].click();
  });

  /* ── 4. LIGHTBOX ── */
  const lightbox    = document.getElementById('lightbox');
  const lbImg       = document.getElementById('lightbox-img');
  const lbClose     = document.getElementById('lightbox-close');

  document.querySelectorAll('.img-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img').src;
      const alt = item.querySelector('img').alt;
      lbImg.src = src;
      lbImg.alt = alt;
      lightbox.classList.add('lb-open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('lb-open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);

  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ── 5. TOOLTIPS DEL ÁRBOL (data-tooltip ya manejados en CSS) ── */
  /* Los tooltips funcionan vía CSS :hover::after. JS solo mejora mobile. */
  document.querySelectorAll('.tree-entry[data-tooltip]').forEach(el => {
    el.setAttribute('title', el.dataset.tooltip);
  });

  /* ── 6. ANIMACIONES DE ENTRADA (fade-up con stagger) ── */
  const staggerGroups = [
    { selector: '.module-card',      delay: 80 },
    { selector: '.db-table-card',    delay: 80 },
    { selector: '.code-metric-card', delay: 100 },
    { selector: '.arch-pill',        delay: 80 },
  ];

  staggerGroups.forEach(({ selector, delay }) => {
    const items = document.querySelectorAll(selector);
    const io2 = new IntersectionObserver(
      entries => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const i  = Array.from(items).indexOf(el);
            setTimeout(() => el.classList.add('visible'), i * delay);
            io2.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    items.forEach(el => io2.observe(el));
  });

  /* fade-up genérico */
  const fadeItems = document.querySelectorAll('.fade-up-init');
  if (fadeItems.length) {
    const io3 = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io3.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeItems.forEach(el => io3.observe(el));
  }

  /* ── Mostrar primera tab de testing por defecto ── */
  document.querySelectorAll('.tabs-bar[data-tab-group]').forEach(bar => {
    const first = bar.querySelector('.tab-btn');
    if (first) first.click();
  });

})();
