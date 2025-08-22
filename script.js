document.addEventListener('DOMContentLoaded', () => {

  // ============== Sticky Header on Scroll ==============
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ============== Burger Menu Jdid ==============
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav__links');
  const mainContent = document.getElementById('main-content');
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    burger.setAttribute('aria-expanded', burger.classList.contains('active'));
    navLinks.classList.toggle('show');
    mainContent.classList.toggle('blurred');
  });

  // ============== Active Nav Link on Scroll ==============
  const sections = document.querySelectorAll('section[id]');
  const navLi = document.querySelectorAll('.nav__links a.nav__link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 75) {
        current = section.getAttribute('id');
      }
    });
    navLi.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href').includes(current)) {
        a.classList.add('active');
      }
    });
  });

  // ============== Gallery Filtering ==============
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery__item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.dataset.filter;
      
      galleryItems.forEach((item, index) => {
        item.style.display = 'none';
        if (item.dataset.category === filterValue || filterValue === '*') {
          item.style.animation = `fadeIn 0.5s forwards ${index * 0.05}s`;
          item.style.display = 'block';
        }
      });
    });
  });
  
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `@keyframes fadeIn { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }`;
  document.head.appendChild(styleSheet);

  // ============== Reveal on Scroll Animation ==============
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => { observer.observe(el); });

  // ============== Form Submission Feedback ==============
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;

    // Simulation d'un envoi (2 secondes)
    setTimeout(() => {
      formMessage.textContent = 'Merci! Votre message a été envoyé avec succès.';
      formMessage.className = 'form-message success';
      formMessage.style.opacity = '1';
      
      submitBtn.textContent = 'Envoyer le Message';
      submitBtn.disabled = false;
      contactForm.reset();

      // Message ikhtafi mn b3d 5 secondes
      setTimeout(() => { formMessage.style.opacity = '0'; }, 5000);
    }, 2000);
  });
});

// ============== GLightbox Initialisation ==============
const lightbox = GLightbox({
  selector: '.glightbox',
  touchNavigation: true,
  loop: true,
});