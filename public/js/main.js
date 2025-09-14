
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

  // --- BeerSlider mobile drag workaround ---
  // Fixes bug where dragging jumps to left and gets stuck on mobile browsers
  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  if (isMobile()) {
    document.querySelectorAll('.beer-slider input[type="range"]').forEach(function(range) {
      let dragging = false;
      range.addEventListener('touchstart', function(e) {
        dragging = true;
        e.stopPropagation();
      }, {passive: false});
      range.addEventListener('touchmove', function(e) {
        if (!dragging) return;
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          const rect = range.getBoundingClientRect();
          let percent = (touch.clientX - rect.left) / rect.width;
          percent = Math.max(0, Math.min(1, percent));
          const value = Math.round(percent * (parseInt(range.max) - parseInt(range.min)) + parseInt(range.min));
          range.value = value;
          range.dispatchEvent(new Event('input', { bubbles: true }));
          range.dispatchEvent(new Event('change', { bubbles: true }));
          e.preventDefault();
        }
      }, {passive: false});
      range.addEventListener('touchend', function(e) {
        dragging = false;
      });
    });
  }
});
