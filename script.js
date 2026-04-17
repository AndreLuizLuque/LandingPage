// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitBtn = contactForm.querySelector('.btn-submit');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const arrowIcon = submitBtn.querySelector('.arrow-icon');
  
  // Show loading state
  submitBtn.disabled = true;
  btnText.style.display = 'none';
  arrowIcon.style.display = 'none';
  btnLoading.style.display = 'inline-flex';
  
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  
  // Simulate form submission
  try {
    const response = await fetch('https://formspree.io/f/xnjldgzn', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
    });
    
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    contactForm.style.display = 'none';
    document.querySelector('.contact-info').style.display = 'none';
    successMessage.style.display = 'block';
    
  } catch (error) {
    console.error('Error:', error);
    alert('There was an error sending your message. Please try again.');
    
    // Reset button state
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    arrowIcon.style.display = 'inline';
    btnLoading.style.display = 'none';
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll effect to navigation
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.style.background = 'rgba(26, 26, 26, 0.95)';
    nav.style.backdropFilter = 'blur(10px)';
  } else {
    nav.style.background = 'linear-gradient(to bottom, var(--background), transparent)';
    nav.style.backdropFilter = 'none';
  }
  
  lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Animate benefit cards on scroll
document.querySelectorAll('.benefit-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `all 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});