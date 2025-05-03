// Visual Effects and Animations
document.addEventListener('DOMContentLoaded', () => {
    // Shine effect tracking for jewelry items
    const jewelryItems = document.querySelectorAll('.product-image-container');
    
    jewelryItems.forEach(item => {
      item.addEventListener('mousemove', handleMouseMove);
      item.addEventListener('mouseleave', handleMouseLeave);
    });
    
    function handleMouseMove(e) {
      const rect = e.target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      this.style.setProperty('--mouse-x', `${x}%`);
      this.style.setProperty('--mouse-y', `${y}%`);
      
      const shineEffect = this.querySelector('.shine-effect');
      if (shineEffect) {
        shineEffect.style.opacity = '1';
      }
      
      // Subtle image tilt effect
      const img = this.querySelector('img');
      if (img) {
        const tiltX = (y - 50) / 10;
        const tiltY = (x - 50) / -10;
        img.style.transform = `scale(1.05) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }
    }
    
    function handleMouseLeave() {
      const shineEffect = this.querySelector('.shine-effect');
      if (shineEffect) {
        shineEffect.style.opacity = '0';
      }
      
      // Reset image transform
      const img = this.querySelector('img');
      if (img) {
        img.style.transform = '';
      }
    }
    
    // Parallax effect for jewelry items
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || window.pageYOffset;
      
      jewelryItems.forEach(item => {
        const speed = 0.05;
        const yPos = -scrollY * speed;
        
        if (isElementInViewport(item)) {
          item.style.transform = `translateY(${yPos}px)`;
        }
      });
    });
    
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }
    
    // Button hover effects
    const buttons = document.querySelectorAll('.details-btn');
    
    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--gold), var(--deep-purple))`;
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.background = 'linear-gradient(45deg, var(--deep-purple), var(--gold))';
      });
    });
    
    // Control jewels animation
    const controlJewels = document.querySelectorAll('.control-jewel');
    
    controlJewels.forEach(jewel => {
      jewel.addEventListener('mousemove', (e) => {
        const rect = jewel.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create gradient effect that follows the cursor
        if (jewel.classList.contains('prev-jewel')) {
          jewel.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--light-gold), var(--gold))`;
        } else if (jewel.classList.contains('next-jewel')) {
          jewel.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--light-silver), var(--silver))`;
        }
      });
      
      jewel.addEventListener('mouseleave', () => {
        if (jewel.classList.contains('prev-jewel')) {
          jewel.style.background = 'linear-gradient(135deg, var(--gold), var(--light-gold))';
        } else if (jewel.classList.contains('next-jewel')) {
          jewel.style.background = 'linear-gradient(135deg, var(--silver), var(--light-silver))';
        }
      });
    });
    
    // Add animation classes on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.product-details, .testimonial-card');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animated');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Pagination jewels animation
    const paginationJewels = document.querySelectorAll('.pagination-jewel');
    
    paginationJewels.forEach(jewel => {
      jewel.addEventListener('mouseenter', () => {
        jewel.style.transform = 'scale(1.1)';
        
        // Create pulse effect
        const pulse = document.createElement('div');
        pulse.classList.add('jewel-pulse');
        pulse.style.position = 'absolute';
        pulse.style.top = '0';
        pulse.style.left = '0';
        pulse.style.width = '100%';
        pulse.style.height = '100%';
        pulse.style.borderRadius = '50%';
        pulse.style.boxShadow = '0 0 0 2px rgba(212, 175, 55, 0.5)';
        pulse.style.animation = 'pulse 1.5s infinite';
        
        // Create keyframes for pulse animation if it doesn't exist yet
        if (!document.querySelector('#pulse-keyframes')) {
          const style = document.createElement('style');
          style.id = 'pulse-keyframes';
          style.textContent = `
            @keyframes pulse {
              0% {
                transform: scale(1);
                opacity: 1;
              }
              100% {
                transform: scale(2);
                opacity: 0;
              }
            }
          `;
          document.head.appendChild(style);
        }
        
        jewel.appendChild(pulse);
      });
      
      jewel.addEventListener('mouseleave', () => {
        jewel.style.transform = '';
        
        const pulse = jewel.querySelector('.jewel-pulse');
        if (pulse) {
          pulse.remove();
        }
      });
    });
    
    // Testimonial card hover effects
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      });
    });
  });


  // Main Slider Functionality
document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.querySelector('.gallery-track');
    const slides = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const paginationJewels = document.querySelectorAll('.pagination-jewel');
    const zoomView = document.querySelector('.zoom-view');
    const zoomedImage = document.querySelector('.zoomed-image');
    const closeZoomBtn = document.querySelector('.close-zoom');
    const jewelryImages = document.querySelectorAll('.product-image-container img');
    
    let currentSlide = 0;
    let slideInterval;
    const autoSlideDelay = 2000; // 2 seconds
    let isTransitioning = false;
    const transitionDelay = 700; // Match the CSS transition time
    
    // Initialize the slider
    function initSlider() {
        updateSlidePositions();
        startAutoSlide();
        
        // Event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        paginationJewels.forEach(jewel => {
            jewel.addEventListener('click', () => {
                if (isTransitioning) return;
                const slideIndex = parseInt(jewel.dataset.index);
                
                // Check if the slideIndex is a valid number
                if (isNaN(slideIndex)) return; // Prevent invalid slide index
                
                goToSlide(slideIndex);
            });
        });
        
        // Handle zoom view
        jewelryImages.forEach(img => {
            img.addEventListener('click', openZoomView);
        });
        
        closeZoomBtn.addEventListener('click', closeZoomView);
        zoomView.addEventListener('click', (e) => {
            if (e.target === zoomView) closeZoomView();
        });
        
        // Pause auto slide on hover
        sliderTrack.addEventListener('mouseenter', pauseAutoSlide);
        sliderTrack.addEventListener('mouseleave', startAutoSlide);
        
        // Add touch support
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            pauseAutoSlide();
        }, { passive: true });
        
        sliderTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        }, { passive: true });
        
        function handleSwipe() {
            const threshold = 50;
            const swipeDistance = touchEndX - touchStartX;
            
            if (swipeDistance > threshold) {
                prevSlide();
            } else if (swipeDistance < -threshold) {
                nextSlide();
            }
        }
    }
    
    // Update the positions of all slides
    function updateSlidePositions() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index === getPrevSlideIndex()) {
                slide.classList.add('prev');
            } else if (index === getNextSlideIndex()) {
                slide.classList.add('next');
            }
        });
        
        // Update pagination
        paginationJewels.forEach((jewel, index) => {
            jewel.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Go to a specific slide
    function goToSlide(index) {
        if (index === currentSlide || isTransitioning) return;
        
        isTransitioning = true;
        currentSlide = index;
        updateSlidePositions();
        
        setTimeout(() => {
            isTransitioning = false;
        }, transitionDelay);
    }
    
    // Go to the next slide
    function nextSlide() {
        if (isTransitioning) return;
        goToSlide(getNextSlideIndex());
    }
    
    // Go to the previous slide
    function prevSlide() {
        if (isTransitioning) return;
        goToSlide(getPrevSlideIndex());
    }
    
    // Get the index of the next slide
    function getNextSlideIndex() {
        return (currentSlide + 1) % slides.length;
    }
    
    // Get the index of the previous slide
    function getPrevSlideIndex() {
        return (currentSlide - 1 + slides.length) % slides.length;
    }
    
    // Start auto sliding
    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, autoSlideDelay);
    }
    
    // Pause auto sliding
    function pauseAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Open zoom view
    function openZoomView(e) {
        const imgSrc = e.target.src;
        const imgAlt = e.target.alt;
        
        zoomedImage.src = imgSrc;
        zoomedImage.alt = imgAlt;
        zoomView.classList.add('active');
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
        
        // Reset auto slide
        pauseAutoSlide();
    }
    
    // Close zoom view
    function closeZoomView() {
        zoomView.classList.remove('active');
        
        // Allow body scrolling
        document.body.style.overflow = '';
        
        // Resume auto slide
        startAutoSlide();
    }
    
    // Initialize the slider
    initSlider();
});
