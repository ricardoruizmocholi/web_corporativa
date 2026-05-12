(function () {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -28px 0px' });

  function init() {
    document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(function (el) {
      io.observe(el);
    });

    document.querySelectorAll('.stagger').forEach(function (container) {
      Array.from(container.children).forEach(function (child, i) {
        child.style.transitionDelay = (i * 100) + 'ms';
        if (!child.classList.contains('fade-up') &&
            !child.classList.contains('fade-left') &&
            !child.classList.contains('fade-right')) {
          child.classList.add('fade-up');
        }
        io.observe(child);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
