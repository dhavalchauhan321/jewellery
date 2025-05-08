
			// Custom cursor implementation
            document.addEventListener('DOMContentLoaded', () => {
                const cursor = document.querySelector('.custom-cursor');
                
                // Don't show custom cursor on touch devices
                if ('ontouchstart' in window || navigator.maxTouchPoints) {
                  document.body.style.cursor = 'auto';
                  cursor.style.display = 'none';
                  
                  // Add regular pointer cursor to interactive elements
                  const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
                  interactiveElements.forEach(el => {
                    el.style.cursor = 'pointer';
                  });
                  
                  return;
                }
                
                // Hide default cursor
                document.body.style.cursor = 'none';
                
                // Track cursor position
                document.addEventListener('mousemove', (e) => {
                  requestAnimationFrame(() => {
                    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                  });
                });
                
                // Handle cursor when leaving the window
                document.addEventListener('mouseout', (e) => {
                  if (e.relatedTarget === null) {
                    cursor.classList.add('hidden');
                  }
                });
                
                document.addEventListener('mouseover', () => {
                  cursor.classList.remove('hidden');
                });
                
                // Hover effect on interactive elements
                const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea, .ring-item, .filter-btn');
                
                interactiveElements.forEach(el => {
                  el.addEventListener('mouseenter', () => {
                    cursor.classList.add('hover');
                  });
                  
                  el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hover');
                  });
                });
                
                // Clicking effect
                document.addEventListener('mousedown', () => {
                  cursor.classList.add('clicking');
                });
                
                document.addEventListener('mouseup', () => {
                  cursor.classList.remove('clicking');
                });
                
                // For text inputs
                const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea');
                
                textInputs.forEach(input => {
                  input.addEventListener('mouseenter', () => {
                    cursor.classList.add('text-input');
                  });
                  
                  input.addEventListener('mouseleave', () => {
                    cursor.classList.remove('text-input');
                  });
                });
              });
              
              // Filter functionality for rings
              document.addEventListener('DOMContentLoaded', () => {
                const filterButtons = document.querySelectorAll('.filter-btn');
                const ringItems = document.querySelectorAll('.ring-item');
                
                // Initialize filter state
                const filterState = {
                  style: 'all',
                  material: 'all',
                  price: 'all'
                };
                
                // Filter rings based on current filter state
                const filterRings = () => {
                  ringItems.forEach(item => {
                    const categories = item.dataset.categories.split(' ');
                    
                    // Check if item passes all filters
                    const styleMatch = filterState.style === 'all' || categories.includes(filterState.style);
                    const materialMatch = filterState.material === 'all' || categories.includes(filterState.material);
                    const priceMatch = filterState.price === 'all' || categories.includes(filterState.price);
                    
                    // Show/hide based on filter match
                    if (styleMatch && materialMatch && priceMatch) {
                      item.style.display = '';
                      setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = '';
                      }, 50);
                    } else {
                      item.style.opacity = '0';
                      item.style.transform = 'scale(0.8)';
                      setTimeout(() => {
                        item.style.display = 'none';
                      }, 300);
                    }
                  });
                };
                
                // Handle filter button clicks
                filterButtons.forEach(button => {
                  button.addEventListener('click', () => {
                    // Update active state for buttons in this group
                    const filterGroup = button.closest('.filter-group');
                    const groupButtons = filterGroup.querySelectorAll('.filter-btn');
                    
                    groupButtons.forEach(btn => {
                      btn.classList.remove('active');
                    });
                    
                    button.classList.add('active');
                    
                    // Update filter state
                    const filterType = filterGroup.querySelector('h3').textContent.toLowerCase();
                    const filterValue = button.dataset.filter;
                    
                    filterState[filterType] = filterValue;
                    
                    // Apply filters
                    filterRings();
                  });
                });
                
                // Initial filtering
                filterRings();
                
                // Add animation for filter buttons
                filterButtons.forEach(button => {
                  button.addEventListener('mouseenter', () => {
                    if (!button.classList.contains('active')) {
                      button.style.transform = 'translateY(-2px)';
                    }
                  });
                  
                  button.addEventListener('mouseleave', () => {
                    if (!button.classList.contains('active')) {
                      button.style.transform = '';
                    }
                  });
                });
              });
              // Main JavaScript file for the jewelry website
              document.addEventListener('DOMContentLoaded', () => {
                // Mobile navigation toggle
                const navToggle = document.querySelector('.nav-toggle');
                const mainNav = document.querySelector('.main-nav');
                
                if (navToggle) {
                  navToggle.addEventListener('click', () => {
                    mainNav.classList.toggle('active');
                    navToggle.classList.toggle('active');
                    
                    // Toggle navigation animation
                    const spans = navToggle.querySelectorAll('span');
                    if (navToggle.classList.contains('active')) {
                      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
                      spans[1].style.transform = 'translateY(-7px) rotate(-45deg)';
                    } else {
                      spans[0].style.transform = '';
                      spans[1].style.transform = '';
                    }
                  });
                }
                
                // Header scroll effect
                const header = document.querySelector('.site-header');
                let lastScrollTop = 0;
                
                window.addEventListener('scroll', () => {
                  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                  
                  // Add background when scrolling down
                  if (scrollTop > 50) {
                    header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
                    header.style.padding = '12px 40px';
                  } else {
                    header.style.backgroundColor = 'rgba(10, 10, 10, 0.85)';
                    header.style.padding = '24px 40px';
                  }
                  
                  // Show/hide header based on scroll direction
                  if (scrollTop > lastScrollTop && scrollTop > 200) {
                    // Scrolling down
                    header.style.transform = 'translateY(-100%)';
                  } else {
                    // Scrolling up
                    header.style.transform = 'translateY(0)';
                  }
                  
                  lastScrollTop = scrollTop;
                });
                
                // Newsletter form submission
                const newsletterForm = document.querySelector('.newsletter-form');
                if (newsletterForm) {
                  newsletterForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const input = newsletterForm.querySelector('input');
                    const email = input.value.trim();
                    
                    if (email) {
                      // Create success notification
                      const notification = document.createElement('div');
                      notification.className = 'notification success';
                      notification.textContent = 'Thank you for subscribing!';
                      document.body.appendChild(notification);
                      
                      // Show notification with animation
                      setTimeout(() => {
                        notification.classList.add('show');
                        setTimeout(() => {
                          notification.classList.remove('show');
                          setTimeout(() => {
                            document.body.removeChild(notification);
                          }, 300);
                        }, 3000);
                      }, 50);
                      
                      // Reset form
                      input.value = '';
                    }
                  });
                }
                
                // Initialize all interactive components
                initializeComponents();
              });
              
              // Helper function to initialize all interactive components
              function initializeComponents() {
                // Add smooth scrolling to all anchor links
                document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                  anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                      targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  });
                });
                
                // Add notification system
                window.showNotification = (message, type = 'info') => {
                  const notification = document.createElement('div');
                  notification.className = `notification ${type}`;
                  notification.textContent = message;
                  document.body.appendChild(notification);
                  
                  setTimeout(() => {
                    notification.classList.add('show');
                    setTimeout(() => {
                      notification.classList.remove('show');
                      setTimeout(() => {
                        document.body.removeChild(notification);
                      }, 300);
                    }, 3000);
                  }, 50);
                };
              }
              
              // Modal functionality for ring details
              document.addEventListener('DOMContentLoaded', () => {
                const modal = document.querySelector('.ring-detail-modal');
                const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
                const closeModalButton = document.querySelector('.close-modal');
                const ringData = JSON.parse(document.querySelector('.ring-data').textContent);
                
                // Elements inside modal
                const detailImage = modal.querySelector('.ring-detail-image img');
                const detailTitle = modal.querySelector('.detail-title');
                const detailDescription = modal.querySelector('.detail-description');
                const materialValue = modal.querySelector('.material-value');
                const gemstoneValue = modal.querySelector('.gemstone-value');
                const detailPrice = modal.querySelector('.detail-price');
                const angleButtons = modal.querySelectorAll('.angle-btn');
                
                // Current ring being viewed
                let currentRing = null;
                
                // Open modal and load ring details
                const openModal = (ringName) => {
                  currentRing = ringName;
                  const ring = ringData[ringName];
                  
                  // Set details
                  detailTitle.textContent = ringName;
                  detailDescription.textContent = ring.description;
                  materialValue.textContent = ring.material;
                  gemstoneValue.textContent = ring.gemstone;
                  detailPrice.textContent = ring.price;
                  detailImage.src = ring.angles.front;
                  detailImage.alt = ringName;
                  
                  // Reset angle buttons
                  angleButtons.forEach(btn => btn.classList.remove('active'));
                  angleButtons[0].classList.add('active');
                  
                  // Show modal with animation
                  modal.classList.add('active');
                  document.body.style.overflow = 'hidden'; // Prevent scrolling
                  
                  // Add scaling animation to image
                  detailImage.style.transform = 'scale(0.9)';
                  setTimeout(() => {
                    detailImage.style.transform = 'scale(1)';
                  }, 50);
                };
                
                // Close modal
                const closeModal = () => {
                  modal.classList.remove('active');
                  document.body.style.overflow = ''; // Restore scrolling
                  currentRing = null;
                  
                  // Reset transformations
                  detailImage.style.transform = '';
                };
                
                // Set up view details buttons
                viewDetailsButtons.forEach(button => {
                  button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const ringItem = button.closest('.ring-item');
                    const ringTitle = ringItem.querySelector('h2').textContent;
                    openModal(ringTitle);
                  });
                });
                
                // Close modal on close button click
                closeModalButton.addEventListener('click', closeModal);
                
                // Close modal on outside click
                modal.addEventListener('click', (e) => {
                  if (e.target === modal) {
                    closeModal();
                  }
                });
                
                // Close modal on escape key
                document.addEventListener('keydown', (e) => {
                  if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeModal();
                  }
                });
                
                // Handle angle buttons
                angleButtons.forEach(button => {
                  button.addEventListener('click', () => {
                    const angle = button.dataset.angle;
                    const ring = ringData[currentRing];
                    
                    // Update image src
                    detailImage.style.opacity = '0';
                    setTimeout(() => {
                      detailImage.src = ring.angles[angle];
                      detailImage.style.opacity = '1';
                    }, 200);
                    
                    // Update active button
                    angleButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                  });
                });
                
                // Add to cart button
                const addToCartButton = modal.querySelector('.add-to-cart');
                addToCartButton.addEventListener('click', () => {
                  const notification = document.createElement('div');
                  notification.className = 'notification';
                  notification.textContent = `${currentRing} added to cart`;
                  document.body.appendChild(notification);
                  
                  setTimeout(() => {
                    notification.classList.add('show');
                    setTimeout(() => {
                      notification.classList.remove('show');
                      setTimeout(() => {
                        document.body.removeChild(notification);
                      }, 300);
                    }, 2000);
                  }, 50);
                });
                
                // Add to wishlist button
                const addToWishlistButton = modal.querySelector('.add-to-wishlist');
                addToWishlistButton.addEventListener('click', () => {
                  addToWishlistButton.classList.toggle('active');
                  if (addToWishlistButton.classList.contains('active')) {
                    addToWishlistButton.textContent = 'Added to Wishlist';
                  } else {
                    addToWishlistButton.textContent = 'Add to Wishlist';
                  }
                });
                
                // Add hover effect to the detail image
                detailImage.addEventListener('mousemove', (e) => {
                  if (window.innerWidth < 768) return; // Disable on small screens
                  
                  const rect = detailImage.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  
                  detailImage.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.05)`;
                });
                
                detailImage.addEventListener('mouseleave', () => {
                  detailImage.style.transform = '';
                });
              });
              
              // Particle animation for the background
              class Particle {
                constructor(container, options = {}) {
                  this.container = container;
                  this.options = Object.assign({
                    size: Math.random() * 3 + 1,
                    speed: Math.random() * 1 + 0.1,
                    color: '#d4af37',
                    opacity: Math.random() * 0.5 + 0.1,
                    blinking: Math.random() > 0.7
                  }, options);
                  
                  this.element = document.createElement('div');
                  this.element.className = 'particle';
                  this.posX = Math.random() * window.innerWidth;
                  this.posY = Math.random() * window.innerHeight;
                  this.rotation = Math.random() * 360;
                  this.element.style.width = `${this.options.size}px`;
                  this.element.style.height = `${this.options.size}px`;
                  this.element.style.backgroundColor = this.options.color;
                  this.element.style.opacity = this.options.opacity;
                  this.element.style.transform = `translate(${this.posX}px, ${this.posY}px) rotate(${this.rotation}deg)`;
                  
                  this.directionX = Math.random() > 0.5 ? 1 : -1;
                  this.directionY = Math.random() > 0.5 ? 1 : -1;
                  
                  this.container.appendChild(this.element);
                  
                  if (this.options.blinking) {
                    this.blinkInterval = setInterval(() => {
                      this.element.style.opacity = Math.random() * 0.5 + 0.1;
                    }, Math.random() * 2000 + 1000);
                  }
                  
                  this.animate();
                }
                
                animate() {
                  this.posX += this.options.speed * this.directionX;
                  this.posY += this.options.speed * this.directionY;
                  this.rotation += 0.1;
                  
                  // Check boundaries
                  if (this.posX > window.innerWidth || this.posX < 0) {
                    this.directionX *= -1;
                  }
                  
                  if (this.posY > window.innerHeight || this.posY < 0) {
                    this.directionY *= -1;
                  }
                  
                  this.element.style.transform = `translate(${this.posX}px, ${this.posY}px) rotate(${this.rotation}deg)`;
                  
                  requestAnimationFrame(this.animate.bind(this));
                }
                
                destroy() {
                  if (this.blinkInterval) {
                    clearInterval(this.blinkInterval);
                  }
                  this.container.removeChild(this.element);
                }
              }
              
              class ParticleSystem {
                constructor(containerId, count = 30) {
                  this.container = document.querySelector(containerId);
                  this.particles = [];
                  this.count = count;
                  this.init();
                  this.handleResize();
                }
                
                init() {
                  for (let i = 0; i < this.count; i++) {
                    this.createParticle();
                  }
                }
                
                createParticle() {
                  const colorVariations = [
                    'rgba(212, 175, 55, 0.6)',  // Gold
                    'rgba(192, 192, 192, 0.3)',  // Silver
                    'rgba(255, 255, 255, 0.2)'   // White
                  ];
                  
                  const color = colorVariations[Math.floor(Math.random() * colorVariations.length)];
                  const particle = new Particle(this.container, { color });
                  this.particles.push(particle);
                }
                
                handleResize() {
                  window.addEventListener('resize', () => {
                    // Destroy all particles
                    this.particles.forEach(particle => particle.destroy());
                    this.particles = [];
                    
                    // Recreate particles
                    this.init();
                  });
                }
              }
              
              // Initialize particle system when DOM is loaded
              document.addEventListener('DOMContentLoaded', () => {
                const particleCount = window.innerWidth < 768 ? 15 : 30;
                new ParticleSystem('.particle-container', particleCount);
              });
              // Ring showcase functionality
              document.addEventListener('DOMContentLoaded', () => {
                const ringsOrbit = document.querySelector('.rings-orbit');
                const ringItems = document.querySelectorAll('.ring-item');
                
                // Parallax effect on mouse move
                const applyParallaxEffect = () => {
                  if (window.innerWidth < 768) return; // Disable parallax on small screens
                  
                  document.addEventListener('mousemove', (e) => {
                    const mouseX = e.clientX / window.innerWidth - 0.5;
                    const mouseY = e.clientY / window.innerHeight - 0.5;
                    
                    requestAnimationFrame(() => {
                      ringsOrbit.style.transform = `rotateY(${mouseX * 5}deg) rotateX(${-mouseY * 5}deg)`;
                      
                      ringItems.forEach((item, index) => {
                        const depth = (index % 3 + 1) * 15;
                        item.style.transform = `translateX(${mouseX * depth}px) translateY(${mouseY * depth}px)`;
                      });
                    });
                  });
                };
                
                // 3D effect on ring hover
                const apply3DEffect = () => {
                  ringItems.forEach(item => {
                    const imageContainer = item.querySelector('.ring-image-container');
                    
                    item.addEventListener('mousemove', (e) => {
                      if (window.innerWidth < 768) return; // Disable 3D effect on small screens
                      
                      const rect = item.getBoundingClientRect();
                      const x = (e.clientX - rect.left) / rect.width - 0.5;
                      const y = (e.clientY - rect.top) / rect.height - 0.5;
                      
                      const rotateY = x * 10;
                      const rotateX = -y * 10;
                      
                      requestAnimationFrame(() => {
                        item.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(20px)`;
                        imageContainer.style.transform = `translateZ(40px)`;
                        
                        // Add depth to shadow based on cursor position
                        const shadowX = -x * 15;
                        const shadowY = -y * 15;
                        item.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(212, 175, 55, 0.2)`;
                      });
                    });
                    
                    item.addEventListener('mouseleave', () => {
                      requestAnimationFrame(() => {
                        item.style.transform = '';
                        imageContainer.style.transform = '';
                        item.style.boxShadow = '';
                      });
                    });
                  });
                };
                
                // Initialize parallax and 3D effects
                if (window.matchMedia('(min-width: 768px)').matches) {
                  applyParallaxEffect();
                  apply3DEffect();
                }
                
                // Handle ring image loading
                ringItems.forEach(item => {
                  const img = item.querySelector('img');
                  const loader = document.createElement('div');
                  loader.className = 'ring-image-loader';
                  loader.innerHTML = '<div class="loader-spinner"></div>';
                  
                  img.addEventListener('load', () => {
                    if (loader.parentNode) {
                      loader.parentNode.removeChild(loader);
                    }
                    img.style.opacity = '1';
                  });
                  
                  img.addEventListener('error', () => {
                    if (loader.parentNode) {
                      loader.parentNode.removeChild(loader);
                    }
                    img.src = 'https://images.pexels.com/photos/7925859/pexels-photo-7925859.jpeg'; // Fallback image
                    img.style.opacity = '1';
                  });
                  
                  if (!img.complete) {
                    img.style.opacity = '0';
                    item.querySelector('.ring-image-container').appendChild(loader);
                  }
                });
                
                // Handle window resize for responsive effects
                window.addEventListener('resize', () => {
                  if (window.matchMedia('(min-width: 768px)').matches) {
                    applyParallaxEffect();
                    apply3DEffect();
                  } else {
                    document.removeEventListener('mousemove', applyParallaxEffect);
                    ringsOrbit.style.transform = '';
                    
                    ringItems.forEach(item => {
                      item.style.transform = '';
                      item.style.boxShadow = '';
                    });
                  }
                });
              });