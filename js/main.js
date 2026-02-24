/**
 * Transport Department – Government Portal
 * Clean JavaScript — No tracking / analytics
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------
     1. NAVBAR – sticky shadow on scroll
     ------------------------------------------------------- */
  const nav = document.querySelector('.nav-main');

  if (nav) {
    const onScroll = () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 4px 20px rgba(0,0,0,.15)'
        : '0 2px 8px rgba(0,0,0,.1)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -------------------------------------------------------
     2. SCROLL REVEAL – fade-up animation
     ------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-up');

  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    fadeEls.forEach((el) => observer.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add('visible'));
  }

  /* -------------------------------------------------------
     3. SMOOTH ANCHOR SCROLLING
     ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navH = nav ? nav.offsetHeight : 50;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
        window.scrollTo({ top, behavior: 'smooth' });

        /* Close mobile menu if open */
        const navCollapse = document.querySelector('#mainNav');
        if (navCollapse && navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });

  /* -------------------------------------------------------
     4. BACK TO TOP
     ------------------------------------------------------- */
  const topBtn = document.getElementById('backToTop');

  if (topBtn) {
    const toggle = () => {
      topBtn.classList.toggle('show', window.scrollY > 400);
    };
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -------------------------------------------------------
     5. FORM VALIDATION
     ------------------------------------------------------- */
  const form = document.getElementById('enquiryForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      console.log('Application submitted:', data);

      const btn = form.querySelector('.btn-submit');
      btn.textContent = 'Processing Application...';
      btn.disabled = true;

      // Logic for redirection to payment pages
      setTimeout(() => {
        let redirectUrl = 'payment.html'; // Default for Replacement/Transfer/etc.

        if (data.serviceType === 'replacement' || data.serviceType === 'retain' || data.serviceType === 'transfer') {
          redirectUrl = 'payment.html'; // Uses 1499(1) QR
        } else if (data.vehicleType === 'two-wheeler') {
          redirectUrl = 'payment-2w.html'; // Uses 1299 QR
        } else if (data.vehicleType === 'four-wheeler') {
          redirectUrl = 'payment-4w.html'; // Uses 1499 QR
        }

        window.location.href = redirectUrl;
      }, 1500);
    });
  }

  /* -------------------------------------------------------
     6. TICKER PAUSE ON HOVER
     ------------------------------------------------------- */
  const ticker = document.querySelector('.ticker-text');
  if (ticker) {
    ticker.addEventListener('mouseenter', () => {
      ticker.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('mouseleave', () => {
      ticker.style.animationPlayState = 'running';
    });
  }

});
