const navToggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('#menu');
const scrollButton = document.querySelector('.scroll-top');
const yearSpan = document.querySelector('#year');

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (navToggle && menu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  ([entry]) => {
    if (scrollButton) {
      scrollButton.classList.toggle('scroll-top--visible', !entry.isIntersecting);
    }
  },
  { threshold: 0.1 }
);

const topSection = document.querySelector('header');
if (topSection) {
  observer.observe(topSection);
}

if (scrollButton) {
  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId.length <= 1) {
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});