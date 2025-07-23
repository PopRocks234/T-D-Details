/**
 * T&D Details - Mobile Auto Detailing
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // Mobile Navigation
  // ======================
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');
  
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', function() {
      mainNav.classList.toggle('show');
      this.setAttribute('aria-expanded', mainNav.classList.contains('show'));
    });
    
    // Close menu when clicking on nav links
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('show');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ======================
  // Smooth Scrolling
  // ======================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without page jump
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });

  // ======================
  // Calendly Integration
  // ======================
  function initCalendly() {
    if (typeof Calendly !== 'undefined') {
      Calendly.initPopupWidget({
        url: 'https://calendly.com/tdddetails',
        prefill: {
          name: '',
          email: '',
          customAnswers: {
            a1: 'Auto Detailing Service'
          }
        },
        utm: {
          utmSource: 'Website',
          utmMedium: 'BookingWidget',
          utmCampaign: 'T&DDetails'
        }
      });
    } else {
      console.warn('Calendly script not loaded');
    }
  }

  // Initialize Calendly buttons if they exist
  const calendlyButtons = document.querySelectorAll('[data-calendly-trigger]');
  if (calendlyButtons.length > 0) {
    calendlyButtons.forEach(button => {
      button.addEventListener('click', initCalendly);
    });
  }

  // ======================
  // Form Validation (if forms exist)
  // ======================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Add your form validation logic here
      console.log('Form submitted');
    });
  }
});
