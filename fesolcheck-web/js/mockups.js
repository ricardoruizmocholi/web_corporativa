(function () {
  /* Pause float animation on hover */
  document.querySelectorAll('.hero-mobile').forEach(function (el) {
    el.addEventListener('mouseenter', function () { el.style.animationPlayState = 'paused'; });
    el.addEventListener('mouseleave', function () { el.style.animationPlayState = 'running'; });
  });

  /* Subtle parallax tilt on hero desktop mockup */
  var heroDesktop = document.querySelector('.hero-desktop');
  if (heroDesktop) {
    var heroVisual = heroDesktop.closest('.hero-visual');
    if (heroVisual) {
      heroVisual.addEventListener('mousemove', function (e) {
        var rect = heroVisual.getBoundingClientRect();
        var dx = ((e.clientX - rect.left) / rect.width  - 0.5) * 4;
        var dy = ((e.clientY - rect.top)  / rect.height - 0.5) * 3;
        heroDesktop.style.transform =
          'perspective(1200px) rotateY(' + (-4 + dx) + 'deg) rotateX(' + (2 - dy) + 'deg)';
      });
      heroVisual.addEventListener('mouseleave', function () {
        heroDesktop.style.transform = 'perspective(1200px) rotateY(-4deg) rotateX(2deg)';
      });
    }
  }
})();
