/* ============================================================
   SERENITY STUDIO AU — script.js
   ============================================================ */

/* ── Nav: scroll effect ── */
(function () {
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });
})();

/* ── Mobile nav toggle ── */
(function () {
  const burger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');
  const closeBtn = document.querySelector('.nav__mobile-close');

  if (burger && mobileNav) {
    burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
    if (closeBtn) closeBtn.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileNav.classList.remove('open'))
    );
  }
})();

/* ── Smooth reveal on scroll (Intersection Observer) ── */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }
    .reveal-delay-4 { transition-delay: 0.4s; }
  `;
  document.head.appendChild(style);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ── Active nav link on scroll ── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[data-section]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(l => {
      l.style.color = l.dataset.section === current
        ? 'var(--brown)'
        : '';
    });
  }, { passive: true });
})();
