// DOM Elements
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCart = document.querySelector('.close-cart');
const productCards = document.querySelectorAll('.product-card');
const filterBtns = document.querySelectorAll('.filter-btn');
const quickViewBtns = document.querySelectorAll('.view-product');
const productModal = document.querySelector('.product-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const closeModal = document.querySelector('.close-modal');
const quantityDecrease = document.querySelector('.quantity-decrease');
const quantityIncrease = document.querySelector('.quantity-increase');
const quantityInput = document.querySelector('.quantity-selector input');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const modalAddToCartBtn = document.querySelector('.add-to-cart-btn');
const cartCount = document.querySelector('.cart-count');
const galleryPrev = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');
const animatedElements = document.querySelectorAll('.animate-on-scroll');

// State variables
let cart = [];
const products = [
  {
    id: 1,
    name: 'Athena Gold Chain',
    price: 249.00,
    category: 'gold',
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Elegant 18K gold-plated chain bracelet with a delicate clasp. Perfect for everyday wear or special occasions.',
    material: '18K Gold-Plated Brass',
    length: 'Adjustable (16-19cm)',
    clasp: 'Lobster'
  },
  {
    id: 2,
    name: 'Luna Silver Bangle',
    price: 189.00,
    category: 'silver',
    image: 'https://images.pexels.com/photos/9428768/pexels-photo-9428768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Minimalist sterling silver bangle with modern design. Lightweight and comfortable for daily wear.',
    material: 'Sterling Silver',
    length: 'Standard (19cm)',
    clasp: 'Open Bangle'
  },
  {
    id: 3,
    name: 'Aurora Rose Gold Cuff',
    price: 219.00,
    category: 'rosegold',
    image: 'https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Statement rose gold cuff bracelet with intricate detailing. The perfect accent piece for any outfit.',
    material: 'Rose Gold-Plated Brass',
    length: 'One Size',
    clasp: 'Open Cuff'
  },
  {
    id: 4,
    name: 'Celestial Sapphire Link',
    price: 329.00,
    category: 'gemstone',
    image: 'https://images.pexels.com/photos/10969048/pexels-photo-10969048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Exquisite silver bracelet featuring genuine sapphire stones with a secure double clasp for safety.',
    material: 'Sterling Silver, Genuine Sapphire',
    length: 'Adjustable (17-20cm)',
    clasp: 'Double Safety'
  },
  {
    id: 5,
    name: 'Soleil Gold Diamond',
    price: 459.00,
    category: 'gold',
    image: 'https://images.pexels.com/photos/10969091/pexels-photo-10969091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Luxurious gold bracelet with sparkling diamond accents. Perfect for special occasions and elegant evenings.',
    material: '18K Gold, Diamond Accents',
    length: 'Adjustable (16-19cm)',
    clasp: 'Box with Safety'
  },
  {
    id: 6,
    name: 'Lyra Silver Charm',
    price: 199.00,
    category: 'silver',
    image: 'https://images.pexels.com/photos/1035683/pexels-photo-1035683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Delicate silver charm bracelet with celestial-inspired charms. Add your personal touch with additional charms.',
    material: 'Sterling Silver',
    length: 'Adjustable (17-21cm)',
    clasp: 'Toggle'
  }
];

let currentProductId = 1;
let currentImageIndex = 0;

// Custom Cursor
function updateCursor(e) {
  cursor.style.opacity = '1';
  cursorFollower.style.opacity = '1';
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
  
  // Delayed follower effect
  setTimeout(() => {
    cursorFollower.style.top = `${e.clientY}px`;
    cursorFollower.style.left = `${e.clientX}px`;
  }, 70);
}

function growCursor() {
  cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
  cursorFollower.style.borderColor = 'var(--primary-color)';
  cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
  cursor.style.backgroundColor = 'var(--primary-color)';
}

function shrinkCursor() {
  cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
  cursorFollower.style.borderColor = 'var(--primary-color)';
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  cursor.style.backgroundColor = 'var(--primary-color)';
}

function hideCursor() {
  cursor.style.opacity = '0';
  cursorFollower.style.opacity = '0';
}

// Sticky Header
function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Animate elements when scrolled into view
  animatedElements.forEach(element => {
    if (isElementInViewport(element)) {
      element.classList.add('active');
    }
  });
}

// Check if element is in viewport
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
}

// Mobile Navigation
function toggleMobileNav() {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('active');
  
  // Animate hamburger icon
  if (hamburger.classList.contains('active')) {
    hamburger.children[0].style.transform = 'translateY(8px) rotate(45deg)';
    hamburger.children[1].style.opacity = '0';
    hamburger.children[2].style.transform = 'translateY(-8px) rotate(-45deg)';
  } else {
    hamburger.children[0].style.transform = 'none';
    hamburger.children[1].style.opacity = '1';
    hamburger.children[2].style.transform = 'none';
  }
}

// Cart Functions
function toggleCart() {
  cartSidebar.classList.toggle('active');
  cartOverlay.classList.toggle('active');
  
  // Prevent body scrolling when cart is open
  if (cartSidebar.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }
  
  updateCartCount();
  updateCartDisplay();
  
  // Animation for cart icon
  cartIcon.classList.add('pulse');
  setTimeout(() => {
    cartIcon.classList.remove('pulse');
  }, 500);
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = count;
}

function updateCartDisplay() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total span:last-child');
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-bag"></i>
        <p>Your cart is empty</p>
        <a href="#collections" class="btn-outline">Start Shopping</a>
      </div>
    `;
    cartTotal.textContent = '$0.00';
    return;
  }
  
  // Calculate total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Update cart items
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)}</p>
        <div class="cart-item-quantity">
          <button class="quantity-decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="remove-item" data-id="${item.id}">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join('');
  
  // Update total
  cartTotal.textContent = `$${total.toFixed(2)}`;
  
  // Add event listeners to new cart item buttons
  document.querySelectorAll('.cart-item .quantity-decrease').forEach(btn => {
    btn.addEventListener('click', () => {
      updateCartItemQuantity(parseInt(btn.dataset.id), -1);
    });
  });
  
  document.querySelectorAll('.cart-item .quantity-increase').forEach(btn => {
    btn.addEventListener('click', () => {
      updateCartItemQuantity(parseInt(btn.dataset.id), 1);
    });
  });
  
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
      removeCartItem(parseInt(btn.dataset.id));
    });
  });
}

function updateCartItemQuantity(id, change) {
  const cartItem = cart.find(item => item.id === id);
  
  if (!cartItem) return;
  
  cartItem.quantity += change;
  
  if (cartItem.quantity <= 0) {
    removeCartItem(id);
  } else {
    updateCartCount();
    updateCartDisplay();
  }
}

function removeCartItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartCount();
  updateCartDisplay();
}

// Product Filtering
function filterProducts(category) {
  productCards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Product Modal
function openProductModal(productId) {
  currentProductId = productId;
  const product = products.find(p => p.id === productId);
  
  if (!product) return;
  
  const modalProductImage = document.querySelector('.modal-product-image img');
  const modalProductTitle = document.querySelector('.modal-product-info h2');
  const modalProductPrice = document.querySelector('.product-price');
  const modalProductDescription = document.querySelector('.product-description');
  const modalProductMaterial = document.querySelector('.product-meta p:nth-child(1) strong').nextSibling;
  const modalProductLength = document.querySelector('.product-meta p:nth-child(2) strong').nextSibling;
  const modalProductClasp = document.querySelector('.product-meta p:nth-child(3) strong').nextSibling;
  
  // Reset quantity
  quantityInput.value = 1;
  
  // Update modal content
  modalProductImage.src = product.image;
  modalProductImage.alt = product.name;
  modalProductTitle.textContent = product.name;
  modalProductPrice.textContent = `$${product.price.toFixed(2)}`;
  modalProductDescription.textContent = product.description;
  modalProductMaterial.textContent = ` ${product.material}`;
  modalProductLength.textContent = ` ${product.length}`;
  modalProductClasp.textContent = ` ${product.clasp}`;
  
  // Show modal with animation
  productModal.classList.add('active');
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  productModal.classList.remove('active');
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Quantity Selector
function decreaseQuantity() {
  let value = parseInt(quantityInput.value);
  if (value > 1) {
    quantityInput.value = value - 1;
  }
}

function increaseQuantity() {
  let value = parseInt(quantityInput.value);
  if (value < 10) {
    quantityInput.value = value + 1;
  }
}

// Product Gallery Navigation
function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + products.length) % products.length;
  const modalProductImage = document.querySelector('.modal-product-image img');
  modalProductImage.src = products[currentImageIndex].image;
  modalProductImage.alt = products[currentImageIndex].name;
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % products.length;
  const modalProductImage = document.querySelector('.modal-product-image img');
  modalProductImage.src = products[currentImageIndex].image;
  modalProductImage.alt = products[currentImageIndex].name;
}

// Initialize animation on page load
function initializeAnimations() {
  // Hero animations
  const heroElements = document.querySelectorAll('.hero .animate-on-scroll');
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('active');
    }, 300 * index);
  });
  
  // Check other elements in viewport
  animatedElements.forEach(element => {
    if (isElementInViewport(element)) {
      element.classList.add('active');
    }
  });
}

// Newsletter form submission
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = e.target.querySelector('input[type="email"]');
  
  if (emailInput.value) {
    // Would typically send to server, for demo we'll just show success message
    const form = e.target;
    const formHeight = form.offsetHeight;
    
    form.innerHTML = `
      <div class="success-message" style="min-height: ${formHeight}px">
        <i class="fas fa-check-circle"></i>
        <p>Thank you for subscribing!</p>
        <p>You'll receive our latest updates and offers.</p>
      </div>
    `;
    
    // Style success message
    const successMessage = form.querySelector('.success-message');
    successMessage.style.display = 'flex';
    successMessage.style.flexDirection = 'column';
    successMessage.style.alignItems = 'center';
    successMessage.style.justifyContent = 'center';
    successMessage.style.textAlign = 'center';
    
    const checkIcon = successMessage.querySelector('i');
    checkIcon.style.fontSize = '4rem';
    checkIcon.style.color = 'var(--success)';
    checkIcon.style.marginBottom = '1.5rem';
  }
}

// Contact form submission
function handleContactSubmit(e) {
  e.preventDefault();
  const nameInput = e.target.querySelector('input[type="text"]');
  const emailInput = e.target.querySelector('input[type="email"]');
  const messageInput = e.target.querySelector('textarea');
  
  if (nameInput.value && emailInput.value && messageInput.value) {
    // Would typically send to server, for demo we'll just show success message
    const form = e.target;
    const formHeight = form.offsetHeight;
    
    form.innerHTML = `
      <div class="success-message" style="min-height: ${formHeight}px">
        <i class="fas fa-check-circle"></i>
        <h3>Message Sent!</h3>
        <p>Thank you for reaching out. We'll get back to you shortly.</p>
      </div>
    `;
    
    // Style success message
    const successMessage = form.querySelector('.success-message');
    successMessage.style.display = 'flex';
    successMessage.style.flexDirection = 'column';
    successMessage.style.alignItems = 'center';
    successMessage.style.justifyContent = 'center';
    successMessage.style.textAlign = 'center';
    
    const checkIcon = successMessage.querySelector('i');
    checkIcon.style.fontSize = '4rem';
    checkIcon.style.color = 'var(--success)';
    checkIcon.style.marginBottom = '1.5rem';
    
    const heading = successMessage.querySelector('h3');
    heading.style.fontFamily = 'var(--font-heading)';
    heading.style.fontSize = '2.4rem';
    heading.style.marginBottom = '1rem';
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations
  initializeAnimations();
  
  // Custom cursor
  document.addEventListener('mousemove', updateCursor);
  document.addEventListener('mouseout', hideCursor);
  
  // Add hover effect for links and buttons
  const interactiveElements = document.querySelectorAll('a, button, .product-card');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', growCursor);
    element.addEventListener('mouseleave', shrinkCursor);
  });
  
  // Sticky header
  window.addEventListener('scroll', handleScroll);
  
  // Mobile navigation
  hamburger.addEventListener('click', toggleMobileNav);
  
  // Close mobile nav when clicking on a link
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.children[0].style.transform = 'none';
      hamburger.children[1].style.opacity = '1';
      hamburger.children[2].style.transform = 'none';
    });
  });
  
  // Cart functionality
  cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    toggleCart();
  });
  
  closeCart.addEventListener('click', toggleCart);
  cartOverlay.addEventListener('click', toggleCart);
  
  // Product filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProducts(btn.dataset.filter);
    });
  });
  
  // Quick view buttons
  quickViewBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openProductModal(products[index].id);
    });
  });
  
  // Close modal
  closeModal.addEventListener('click', closeProductModal);
  modalOverlay.addEventListener('click', closeProductModal);
  
  // Quantity selector
  quantityDecrease.addEventListener('click', decreaseQuantity);
  quantityIncrease.addEventListener('click', increaseQuantity);
  
  // Add to cart buttons
  addToCartBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      addToCart(products[index].id);
    });
  });
  
  // Modal add to cart
  modalAddToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    addToCart(currentProductId, quantity);
    closeProductModal();
  });
  
  // Gallery navigation
  galleryPrev.addEventListener('click', prevImage);
  galleryNext.addEventListener('click', nextImage);
  
  // Form submissions
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
  
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
});

// CSS animations for product cards on hover
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    const animation = card.animate([
      { transform: 'translateY(0)' },
      { transform: 'translateY(-5px)' }
    ], {
      duration: 300,
      fill: 'forwards',
      easing: 'ease-out'
    });
    
    // Add subtle shadow
    card.style.boxShadow = 'var(--shadow-md)';
  });
  
  card.addEventListener('mouseleave', function() {
    const animation = card.animate([
      { transform: 'translateY(-5px)' },
      { transform: 'translateY(0)' }
    ], {
      duration: 300,
      fill: 'forwards',
      easing: 'ease-out'
    });
    
    // Remove shadow
    card.style.boxShadow = 'none';
  });
});

// Add keydown event for closing modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (productModal.classList.contains('active')) {
      closeProductModal();
    }
    if (cartSidebar.classList.contains('active')) {
      toggleCart();
    }
  }
});

// Create a parallax effect on scroll
window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  
  // Hero parallax effect
  const heroImage = document.querySelector('.hero-image img');
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
  }
  
  // Featured image parallax effect
  const featuredImage = document.querySelector('.featured-image img');
  if (featuredImage && isElementInViewport(featuredImage)) {
    featuredImage.style.transform = `translateY(${(scrollPosition - featuredImage.getBoundingClientRect().top - window.innerHeight) * 0.1}px)`;
  }
  
  // About image parallax effect
  const aboutImage = document.querySelector('.about-image img');
  if (aboutImage && isElementInViewport(aboutImage)) {
    aboutImage.style.transform = `translateY(${(scrollPosition - aboutImage.getBoundingClientRect().top - window.innerHeight) * 0.1}px)`;
  }
});