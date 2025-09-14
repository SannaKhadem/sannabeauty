document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('active');
    });
  }

  // Clinic name click effect
  const clinicName = document.querySelector('.clinic-name');
  if (clinicName) {
    clinicName.addEventListener('click', function () {
      clinicName.classList.toggle('active');
    });
  }

  // Initialize BeerSlider instances if library is loaded
  if (window.BeerSlider) {
    document.querySelectorAll('.beer-slider').forEach(el => {
      // Avoid re-init if a data flag exists
      if (!el.dataset.beerInitialized) {
        try {
          new BeerSlider(el);
          el.dataset.beerInitialized = 'true';
        } catch (e) {
          console.warn('BeerSlider init failed', e);
        }
      }
    });
  }

  // Prevent default image dragging behavior inside beer sliders (improves touch)
  document.querySelectorAll('.beer-slider img').forEach(img => {
    img.addEventListener('dragstart', e => e.preventDefault());
    img.setAttribute('draggable', 'false');
  });
});
