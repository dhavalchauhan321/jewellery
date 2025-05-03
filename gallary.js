// Gallery data - simulating API response
const galleryData = [
    {
      id: 1,
      title: "Diamond Solitaire Ring",
      category: "rings",
      imageUrl: "https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Elegant 2-carat diamond solitaire ring in 18k white gold"
    },
    {
      id: 2,
      title: "Pearl Necklace",
      category: "necklaces",
      imageUrl: "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "South Sea pearl strand with diamond clasp"
    },
    {
      id: 3,
      title: "Sapphire Earrings",
      category: "earrings",
      imageUrl: "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Blue sapphire and diamond drop earrings"
    },
    {
      id: 4,
      title: "Gold Bangle",
      category: "bracelets",
      imageUrl: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "18k gold twisted bangle with diamond accents"
    },
    {
      id: 5,
      title: "Emerald Ring",
      category: "rings",
      imageUrl: "https://images.pexels.com/photos/2697616/pexels-photo-2697616.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Colombian emerald ring with diamond halo"
    },
    {
      id: 6,
      title: "Diamond Tennis Bracelet",
      category: "bracelets",
      imageUrl: "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Classic diamond tennis bracelet in platinum"
    },
    {
      id: 7,
      title: "Ruby Pendant",
      category: "necklaces",
      imageUrl: "https://images.pexels.com/photos/2697608/pexels-photo-2697608.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Burmese ruby pendant with diamond accent"
    },
    {
      id: 8,
      title: "Diamond Studs",
      category: "earrings",
      imageUrl: "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Classic diamond stud earrings"
    }
  ];
  
  // More gallery data for "load more" functionality
  const moreGalleryData = [
    {
      id: 9,
      title: "Tanzanite Ring",
      category: "rings",
      imageUrl: "https://images.pexels.com/photos/2697616/pexels-photo-2697616.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Rare tanzanite and diamond ring"
    },
    {
      id: 10,
      title: "Pearl Earrings",
      category: "earrings",
      imageUrl: "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "South Sea pearl and diamond drop earrings"
    },
    {
      id: 11,
      title: "Diamond Choker",
      category: "necklaces",
      imageUrl: "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Modern diamond choker necklace"
    },
    {
      id: 12,
      title: "Gold Cuff",
      category: "bracelets",
      imageUrl: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Statement gold cuff with precious stones"
    }
  ];
  
  // Initialize variables
  let currentItems = galleryData;
  let currentFilter = 'all';
  let currentLightboxIndex = 0;
  
  // DOM Elements
  const galleryGrid = document.querySelector('.gallery-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const lightbox = document.querySelector('.gallery-lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  
  // Initialize gallery
  function initGallery() {
    renderGalleryItems(currentItems);
    setupEventListeners();
  }
  
  // Render gallery items
  function renderGalleryItems(items) {
    galleryGrid.innerHTML = '';
    
    items.forEach((item, index) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.dataset.category = item.category;
      galleryItem.dataset.index = index;
      
      galleryItem.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.title}" loading="lazy">
        <div class="gallery-item-overlay">
          <div class="gallery-item-title">${item.title}</div>
          <div class="gallery-item-category">${item.category}</div>
        </div>
      `;
      
      galleryGrid.appendChild(galleryItem);
      
      // Add staggered animation
      setTimeout(() => {
        galleryItem.classList.add('loaded');
      }, 100 * index);
    });
  }
  
  // Filter gallery items
  function filterGallery(category) {
    currentFilter = category;
    let filteredItems;
    
    if (category === 'all') {
      filteredItems = currentItems;
    } else {
      filteredItems = currentItems.filter(item => item.category === category);
    }
    
    renderGalleryItems(filteredItems);
  }
  
  // Load more items
  function loadMoreItems() {
    currentItems = [...currentItems, ...moreGalleryData];
    loadMoreBtn.style.display = 'none';
    
    if (currentFilter === 'all') {
      renderGalleryItems(currentItems);
    } else {
      filterGallery(currentFilter);
    }
  }
  
  // Open lightbox
  function openLightbox(index) {
    currentLightboxIndex = index;
    const item = currentItems[index];
    
    lightboxImage.src = item.imageUrl;
    lightboxCaption.textContent = item.description;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Navigate lightbox
  function navigateLightbox(direction) {
    let newIndex = currentLightboxIndex + direction;
    
    if (newIndex < 0) {
      newIndex = currentItems.length - 1;
    } else if (newIndex >= currentItems.length) {
      newIndex = 0;
    }
    
    currentLightboxIndex = newIndex;
    const item = currentItems[newIndex];
    
    lightboxImage.style.opacity = 0;
    
    setTimeout(() => {
      lightboxImage.src = item.imageUrl;
      lightboxCaption.textContent = item.description;
      lightboxImage.style.opacity = 1;
    }, 300);
  }
  
  // Setup event listeners
  function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterGallery(button.dataset.filter);
      });
    });
    
    // Load more button
    loadMoreBtn.addEventListener('click', loadMoreItems);
    
    // Gallery item click (lightbox)
    galleryGrid.addEventListener('click', (e) => {
      const galleryItem = e.target.closest('.gallery-item');
      if (galleryItem) {
        const index = parseInt(galleryItem.dataset.index);
        openLightbox(index);
      }
    });
    
    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      }
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Intersection Observer for lazy loading and animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
      observer.observe(item);
    });
  }
  
  // Initialize gallery when DOM is loaded
  document.addEventListener('DOMContentLoaded', initGallery);