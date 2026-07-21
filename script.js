// Mobile menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav__links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const id = entry.target.id;
      const map = { domov: 'domov', sluzby: 'sluzby', technika: 'sluzby', referencie: 'referencie', onas: 'onas', kontakt: 'kontakt' };
      const active = document.querySelector(`.nav__links a[href="#${map[id] || id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => observer.observe(s));

// Nav border glow on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20 ? '0 2px 30px rgba(0,0,0,0.8)' : 'none';
}, { passive: true });

// License lightbox
const lightbox        = document.getElementById('lightbox');
const licenseThumb    = document.getElementById('licenseThumb');
const lightboxClose   = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');

function openLightbox()  { lightbox.classList.add('open');    document.body.style.overflow = 'hidden'; }
function closeLightbox() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }

licenseThumb?.addEventListener('click', openLightbox);
lightboxClose?.addEventListener('click', closeLightbox);
lightboxBackdrop?.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Contact form
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  success.classList.add('show');
  e.target.reset();
  setTimeout(() => success.classList.remove('show'), 5000);
});

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.service-card, .reference-card, .tech__tag, .about__stat, .feature-item');
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.45s ease ${i * 0.06}s, transform 0.45s ease ${i * 0.06}s`;
  fadeObs.observe(el);
});
