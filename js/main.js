// ============ NAVIGATION ============
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Mobile dropdown toggle
dropdowns.forEach(dropdown => {
  const link = dropdown.querySelector(':scope > .nav-link');
  link?.addEventListener('click', e => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      dropdown.classList.toggle('open');
    }
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.navbar')) {
    navMenu?.classList.remove('open');
    hamburger?.classList.remove('open');
    dropdowns.forEach(d => d.classList.remove('open'));
  }
});

// ============ ACTIVE NAV LINK ============
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentFile || (currentFile === '' && href === 'index.html')) {
    link.classList.add('active');
    // also mark parent dropdown as active
    const parent = link.closest('.dropdown');
    if (parent) parent.querySelector(':scope > .nav-link')?.classList.add('active');
  }
});

// ============ SCROLL ANIMATIONS ============
const animEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

animEls.forEach(el => observer.observe(el));

// ============ CAROUSELS ============
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const slides = carousel.querySelectorAll('.carousel-slide');
  const thumbs = carousel.querySelectorAll('.carousel-thumb');
  const dots   = carousel.querySelectorAll('.carousel-dot');
  const prev   = carousel.querySelector('.carousel-prev');
  const next   = carousel.querySelector('.carousel-next');
  let current  = 0;

  function go(index) {
    slides[current].classList.remove('active');
    thumbs[current]?.classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    thumbs[current]?.classList.add('active');
    dots[current]?.classList.add('active');
  }

  prev?.addEventListener('click', () => go(current - 1));
  next?.addEventListener('click', () => go(current + 1));
  thumbs.forEach((t, i) => t.addEventListener('click', () => go(i)));
  dots.forEach((d, i)   => d.addEventListener('click', () => go(i)));
});

// ============ CONTACT FORM ============
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Verzonden! ✓';
  btn.style.background = '#22c55e';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 3500);
});
