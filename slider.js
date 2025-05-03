// Jewelry data
const jewelsData = [
    {
        id: 1,
        title: "Diamond Constellation Necklace",
        description: "A masterpiece featuring 18k white gold with 2.5 carats of brilliant-cut diamonds arranged in a celestial pattern.",
        price: 8750,
        imageUrl: "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Necklaces"
    },
    {
        id: 2,
        title: "Sapphire Eternity Ring",
        description: "Crafted with precision, this platinum band showcases rare blue sapphires in a seamless eternity setting.",
        price: 5400,
        imageUrl: "https://images.pexels.com/photos/10921385/pexels-photo-10921385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Rings"
    },
    {
        id: 3,
        title: "Emerald Cascade Earrings",
        description: "Colombian emeralds suspended in 18k gold with pave diamond accents create a mesmerizing waterfall effect.",
        price: 12800,
        imageUrl: "https://images.pexels.com/photos/9428867/pexels-photo-9428867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Earrings"
    },
    {
        id: 4,
        title: "Ruby Solstice Bracelet",
        description: "A stunning display of Burmese rubies interspersed with brilliant diamonds on a flexible white gold chain.",
        price: 15200,
        imageUrl: "https://images.pexels.com/photos/8891763/pexels-photo-8891763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Bracelets"
    },
    {
        id: 5,
        title: "Pearl Essence Pendant",
        description: "South Sea pearl of exceptional luster, surrounded by a diamond halo and suspended on a delicate gold chain.",
        price: 6300,
        imageUrl: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        category: "Pendants"
    }
  ];
  
  class JewelrySlider {
    constructor() {
        // DOM elements
        this.container = document.getElementById('jewelrySlider');
        this.track = document.getElementById('sliderTrack');
        this.indicators = document.getElementById('sliderIndicators');
        this.progressBar = document.getElementById('progressBar');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.customCursor = document.getElementById('customCursor');
  
        // State
        this.currentIndex = 0;
        this.isAnimating = false;
        this.isPaused = false;
        this.autoplayInterval = null;
  
        // Initialize
        this.init();
    }
  
    init() {
        this.createSlides();
        this.createIndicators();
        this.updateSlideState();
        this.bindEvents();
        this.startAutoplay();
    }
  
    createSlides() {
        jewelsData.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = `slider-slide ${index === 0 ? 'active' : ''}`;
            
            slide.innerHTML = `
                <div class="slide-image-container">
                    <img src="${item.imageUrl}" alt="${item.title}" class="slide-image">
                    <div class="image-overlay"></div>
                </div>
                <div class="slide-content ${index === 0 ? 'active' : ''}">
                    <h2 class="slide-title">${item.title}</h2>
                    <p class="slide-description">${item.description}</p>
                    <div class="slide-price">$${item.price.toLocaleString()}</div>
                    <button class="view-details-btn">View Details</button>
                </div>
            `;
  
            this.track.appendChild(slide);
        });
    }
  
    createIndicators() {
        jewelsData.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `slider-indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicators.appendChild(indicator);
        });
    }
  
    updateSlideState() {
        // Update track position
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  
        // Update slides
        const slides = this.track.querySelectorAll('.slider-slide');
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentIndex);
            slide.querySelector('.slide-content').classList.toggle('active', index === this.currentIndex);
        });
  
        // Update indicators
        const indicators = this.indicators.querySelectorAll('.slider-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
  
        // Update progress bar
        this.progressBar.style.width = `${((this.currentIndex + 1) / jewelsData.length) * 100}%`;
    }
  
    goToSlide(index) {
        if (this.isAnimating) return;
  
        this.isAnimating = true;
        this.currentIndex = index;
        this.updateSlideState();
  
        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
    }
  
    goToNext() {
        const newIndex = (this.currentIndex + 1) % jewelsData.length;
        this.goToSlide(newIndex);
    }
  
    goToPrev() {
        const newIndex = (this.currentIndex - 1 + jewelsData.length) % jewelsData.length;
        this.goToSlide(newIndex);
    }
  
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            if (!this.isPaused) {
                this.goToNext();
            }
        }, 2000);
    }
  
    bindEvents() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.goToPrev());
        this.nextBtn.addEventListener('click', () => this.goToNext());
  
        // Custom cursor
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.customCursor.style.left = `${e.clientX - rect.left}px`;
            this.customCursor.style.top = `${e.clientY - rect.top}px`;
        });
  
        this.container.addEventListener('mouseenter', () => {
            this.customCursor.style.opacity = '1';
            this.isPaused = true;
        });
  
        this.container.addEventListener('mouseleave', () => {
            this.customCursor.style.opacity = '0';
            this.isPaused = false;
        });
  
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.goToPrev();
            if (e.key === 'ArrowRight') this.goToNext();
        });
    }
  }
  
  // Initialize slider when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new JewelrySlider();
  });