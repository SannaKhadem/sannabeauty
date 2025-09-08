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
    clinicName.addEventListener('click', function (e) {
      clinicName.classList.toggle('active');
    });
  }
});
