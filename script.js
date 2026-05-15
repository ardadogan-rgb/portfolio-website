/* ============================================
   Ahmet Arda Doğan - Portfolio JavaScript
   Features:
   1. Mobile Hamburger Menu
   2. Theme Switcher (Dark/Light)
   3. Image Slider/Carousel
   4. Typing Animation
   5. Portfolio Filter & Modal Popup
   6. FAQ Accordion Toggle
   7. Form Validation
   8. Scroll Reveal Animations
   9. Back to Top Button
   10. Navbar Scroll Effect
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. Mobile Hamburger Menu =====
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // ===== 2. Theme Switcher =====
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  }

  // ===== 3. Image Slider =====
  const sliderTrack = document.getElementById('sliderTrack');
  const sliderDots = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');

  if (sliderTrack) {
    const slides = sliderTrack.querySelectorAll('.slide');
    let currentSlide = 0;
    let autoSlideInterval;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', () => goToSlide(i));
      sliderDots.appendChild(dot);
    });

    function goToSlide(index) {
      currentSlide = index;
      sliderTrack.style.transform = 'translateX(-' + (index * 100) + '%)';
      document.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    function nextSlide() {
      goToSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
      goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

    // Auto-play
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 4000);
    }
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }
    startAutoSlide();
  }

  // ===== 4. Typing Animation =====
  const typingElement = document.querySelector('.hero h1 .gradient-text');
  if (typingElement) {
    const words = ['Ahmet Arda', 'a Web Developer', 'a Designer', 'a Creator'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const current = words[wordIndex];
      if (isDeleting) {
        typingElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === current.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500;
      }

      setTimeout(typeEffect, speed);
    }

    setTimeout(typeEffect, 1500);
  }

  // ===== 5. Portfolio Filter & Modal =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal functionality
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');

  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      if (!modal) return;
      const imgSrc = card.querySelector('img').src;
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');
      const techs = card.getAttribute('data-techs').split(',');

      document.getElementById('modalImg').src = imgSrc;
      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalDesc').textContent = desc;

      const techsContainer = document.getElementById('modalTechs');
      techsContainer.innerHTML = '';
      techs.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'modal-tech';
        span.textContent = tech.trim();
        techsContainer.appendChild(span);
      });

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ===== 6. FAQ Accordion =====
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all other items
      faqItems.forEach(other => other.classList.remove('active'));
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ===== 7. Form Validation =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate first name
      const firstName = document.getElementById('firstName');
      if (firstName.value.trim().length < 2) {
        setError(firstName);
        isValid = false;
      } else {
        setSuccess(firstName);
      }

      // Validate last name
      const lastName = document.getElementById('lastName');
      if (lastName.value.trim().length < 2) {
        setError(lastName);
        isValid = false;
      } else {
        setSuccess(lastName);
      }

      // Validate email
      const email = document.getElementById('email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        setError(email);
        isValid = false;
      } else {
        setSuccess(email);
      }

      // Validate subject
      const subject = document.getElementById('subject');
      if (!subject.value) {
        setError(subject);
        isValid = false;
      } else {
        setSuccess(subject);
      }

      // Validate message
      const message = document.getElementById('message');
      if (message.value.trim().length < 10) {
        setError(message);
        isValid = false;
      } else {
        setSuccess(message);
      }

      // If valid, show success
      if (isValid) {
        contactForm.style.display = 'none';
        document.getElementById('formSuccess').classList.add('active');
      }
    });

    // Real-time validation on input
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        group.classList.remove('error', 'success');
      });
    });
  }

  function setError(element) {
    const group = element.closest('.form-group');
    group.classList.remove('success');
    group.classList.add('error');
  }

  function setSuccess(element) {
    const group = element.closest('.form-group');
    group.classList.remove('error');
    group.classList.add('success');
  }

  // ===== 8. Scroll Reveal Animation =====
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  // ===== 9. Back to Top Button =====
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== 10. Navbar Scroll Effect =====
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ===== 11. Skill Bars Animation =====
  const skillFills = document.querySelectorAll('.skill-fill');
  const animateSkills = () => {
    skillFills.forEach(fill => {
      const rect = fill.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        fill.style.width = fill.getAttribute('data-width') + '%';
      }
    });
  };
  window.addEventListener('scroll', animateSkills);
  animateSkills();

});

// CSS animation keyframe for filter
const style = document.createElement('style');
style.textContent = '@keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }';
document.head.appendChild(style);
