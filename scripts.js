document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');

  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('show');
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !expanded);
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          mainNav.classList.remove('show');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Calendly inline widget update based on vehicle size
  const vehicleRadios = document.querySelectorAll('input[name="vehicleSize"]');
  const calendlyWidget = document.querySelector('.calendly-inline-widget');

  vehicleRadios.forEach(radio => {
    radio.addEventListener('change', function () {
      const selectedSize = this.value;
      const baseUrl = 'https://calendly.com/tdddetails?hide_event_type_details=1';
      const newUrl = `${baseUrl}&vehicle=${encodeURIComponent(selectedSize)}`;
      calendlyWidget.setAttribute('data-url', newUrl);

      if (window.Calendly) {
        Calendly.initInlineWidget({
          url: newUrl,
          parentElement: calendlyWidget,
          prefill: {},
          utm: {},
        });
      }
    });
  });
});