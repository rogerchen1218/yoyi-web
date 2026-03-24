// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const fixedCta = document.getElementById('fixedCta');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 80) {
    navbar.classList.add('scrolled');
    fixedCta.classList.add('show');
  } else {
    navbar.classList.remove('scrolled');
    fixedCta.classList.remove('show');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== INTERSECTION OBSERVER - REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal, .fade-up').forEach(el => {
  revealObserver.observe(el);
});

// Add fade-up to various sections
const fadeUpElements = document.querySelectorAll(
  '.stat-card, .service-card, .menu-card, .why-item, .review-card, .contact-item, .strip-item, .about-content, .about-visual, .why-content, .why-visual, .contact-info, .contact-form-wrap'
);
fadeUpElements.forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  revealObserver.observe(el);
});

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  submitBtn.textContent = '✓ 已送出，我們將盡快與您聯繫！';
  submitBtn.style.background = '#22c55e';
  submitBtn.disabled = true;
  setTimeout(() => {
    submitBtn.textContent = '送出詢問';
    submitBtn.style.background = '';
    submitBtn.disabled = false;
    contactForm.reset();
  }, 4000);
});

// ===== COUNT UP ANIMATION =====
function animateCounter(el) {
  const targetVal = el.textContent;
  const isPercent = targetVal.includes('%');
  const isPlus = targetVal.includes('+');
  const num = parseFloat(targetVal.replace(/[^0-9.]/g, ''));
  
  if (isNaN(num)) return;
  
  let start = 0;
  const duration = 1500;
  const step = num / (duration / 16);
  
  const timer = setInterval(() => {
    start = Math.min(start + step, num);
    let display = Number.isInteger(num) ? Math.floor(start) : start.toFixed(0);
    if (isPercent) display += '%';
    if (isPlus) display += '+';
    el.textContent = display;
    if (start >= num) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-num, .badge-num').forEach(el => {
  counterObserver.observe(el);
});

// ===== PARALLAX HERO =====
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', () => {
  if (heroBg) {
    const scrollY = window.scrollY;
    heroBg.style.transform = `scale(1) translateY(${scrollY * 0.3}px)`;
  }
}, { passive: true });

// ===== INITIAL HERO REVEAL =====
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach(el => {
      el.classList.add('visible');
    });
  }, 200);
});
