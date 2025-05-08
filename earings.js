// Product data
const products = [
    {
      id: 1,
      name: "Diamond Stud Earrings",
      price: 1299,
      image: "https://images.pexels.com/photos/10950784/pexels-photo-10950784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "studs",
      material: "18k White Gold",
      isNew: true,
      onSale: false
    },
    {
      id: 2,
      name: "Pearl Drop Earrings",
      price: 899,
      salePrice: 699,
      image: "https://images.pexels.com/photos/14618230/pexels-photo-14618230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "drops",
      material: "14k Yellow Gold",
      isNew: false,
      onSale: true
    },
    {
      id: 3,
      name: "Sapphire Hoop Earrings",
      price: 1599,
      image: "https://images.pexels.com/photos/12415652/pexels-photo-12415652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "hoops",
      material: "18k Rose Gold",
      isNew: true,
      onSale: false
    },
    {
      id: 4,
      name: "Emerald Chandelier Earrings",
      price: 2499,
      image: "https://images.pexels.com/photos/11649499/pexels-photo-11649499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "chandelier",
      material: "18k White Gold",
      isNew: false,
      onSale: false
    },
    {
      id: 5,
      name: "Classic Pearl Studs",
      price: 599,
      salePrice: 499,
      image: "https://images.pexels.com/photos/13446055/pexels-photo-13446055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "pearl",
      material: "14k Yellow Gold",
      isNew: false,
      onSale: true
    },
    {
      id: 6,
      name: "Ruby Teardrop Earrings",
      price: 1899,
      image: "https://images.pexels.com/photos/10950785/pexels-photo-10950785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "drops",
      material: "18k Rose Gold",
      isNew: true,
      onSale: false
    },
    {
      id: 7,
      name: "Gold Twisted Hoops",
      price: 799,
      image: "https://images.pexels.com/photos/11483647/pexels-photo-11483647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "hoops",
      material: "14k Yellow Gold",
      isNew: false,
      onSale: false
    },
    {
      id: 8,
      name: "Diamond Cluster Studs",
      price: 2299,
      salePrice: 1899,
      image: "https://images.pexels.com/photos/10041677/pexels-photo-10041677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "studs",
      material: "18k White Gold",
      isNew: false,
      onSale: true
    },
    {
      id: 9,
      name: "Silver Filigree Chandelier",
      price: 1399,
      image: "https://images.pexels.com/photos/12000252/pexels-photo-12000252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      category: "chandelier",
      material: "Sterling Silver",
      isNew: true,
      onSale: false
    }
  ];
  
  // DOM Elements
  const productsGrid = document.getElementById('productsGrid');
  const categoryFilter = document.getElementById('categoryFilter');
  const filterToggle = document.getElementById('filterToggle');
  const categoryButtons = document.querySelectorAll('.category-filter button');
  
  // Featured Product Parallax
  let featuredImage = document.querySelector('.featured-image');
  window.addEventListener('scroll', () => {
    if (featuredImage) {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.15;
      featuredImage.style.transform = `translateY(${rate}px)`;
    }
  });
  
  // Toggle Filter on Mobile
  filterToggle.addEventListener('click', () => {
    categoryFilter.classList.toggle('active');
    filterToggle.querySelector('svg').style.transform = 
      categoryFilter.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
  });
  
  // Filter Products
  function filterProducts(category) {
    const filteredProducts = category === 'all' 
      ? products 
      : products.filter(product => product.category === category);
    
    renderProducts(filteredProducts);
    
    // Update active state of category buttons
    categoryButtons.forEach(button => {
      button.classList.toggle('active', button.dataset.category === category);
    });
  }
  
  // Create Product Card
  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
      <div class="product-image-container">
        <img class="product-image" src="${product.image}" alt="${product.name}">
        <div class="product-overlay">
          <div class="quick-actions">
            <button class="quick-action-btn" title="Quick view">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
              </svg>
            </button>
            <button class="quick-action-btn" title="Add to wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </button>
            <button class="quick-action-btn" title="Add to cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </button>
          </div>
        </div>
        ${product.isNew ? '<span class="product-tag tag-new">New</span>' : ''}
        ${product.onSale ? '<span class="product-tag tag-sale">Sale</span>' : ''}
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-material">${product.material}</p>
        <div class="product-price">
          ${product.onSale 
            ? `<span class="price-sale">$${product.salePrice}</span>
               <span class="price-original">$${product.price}</span>`
            : `<span>$${product.price}</span>`
          }
        </div>
      </div>
    `;
    
    return card;
  }
  
  // Render Products
  function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    productsToRender.forEach(product => {
      productsGrid.appendChild(createProductCard(product));
    });
  }
  
  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    
    // Add click handlers to category buttons
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterProducts(button.dataset.category);
      });
    });
  });
  
  // Quick action handlers
  document.addEventListener('click', (e) => {
    if (e.target.closest('.quick-action-btn')) {
      e.preventDefault();
      const action = e.target.closest('.quick-action-btn').title;
      // Here you would implement the actual functionality
      console.log(`${action} clicked`);
    }
  });