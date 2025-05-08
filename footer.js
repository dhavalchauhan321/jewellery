// Update copyright year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Newsletter form handling
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const subscriptionSuccess = document.getElementById('subscriptionSuccess');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (emailInput.value && emailInput.value.includes('@')) {
    subscriptionSuccess.classList.remove('hidden');
    emailInput.value = '';
    setTimeout(() => {
      subscriptionSuccess.classList.add('hidden');
    }, 3000);
  }
});

// Intersection Observer for reveal animations
const observeElements = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal-section').forEach((element) => {
    observer.observe(element);
  });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  observeElements();
});

// Shimmer effect for interactive elements
const createShimmerEffect = (element) => {
  const shimmer = document.createElement('div');
  shimmer.classList.add('shimmer-effect');
  
  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    shimmer.style.left = `${x}px`;
    shimmer.style.top = `${y}px`;
    
    element.appendChild(shimmer);
    
    setTimeout(() => {
      shimmer.remove();
    }, 1000);
  };
  
  element.addEventListener('mousemove', handleMouseMove);
};

// Apply shimmer effect to interactive elements
document.querySelectorAll('.social-icon, .nav-group a').forEach((element) => {
  createShimmerEffect(element);
});

// Parallax effect for decorative elements
const applyParallax = () => {
  const glowElements = document.querySelectorAll('.footer-glow');
  
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    glowElements.forEach((element) => {
      const moveX = (clientX / innerWidth - 0.5) * 20;
      const moveY = (clientY / innerHeight - 0.5) * 20;
      
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
};

applyParallax();