// Client testimonials data
const clientTestimonials = [
  {
    id: 1,
    name: "Isabella Montgomery",
    role: "Fashion Designer",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    testimonial: "The craftsmanship of their pieces is absolutely exceptional. The Celestial Diamond Ring I purchased exceeded all my expectations.",
    purchasedItem: "Celestial Diamond Ring"
  },
  {
    id: 2,
    name: "Alexander Chen",
    role: "Art Curator",
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    testimonial: "Each piece tells a unique story. The Sapphire Ocean Necklace has become my signature accessory for gallery openings.",
    purchasedItem: "Sapphire Ocean Necklace"
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    role: "Interior Designer",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 5,
    testimonial: "The attention to detail is remarkable. The Emerald Cascade Earrings perfectly complement any evening attire.",
    purchasedItem: "Emerald Cascade Earrings"
  }
];

// Function to create star rating HTML
function createStarRating(rating) {
  return '★'.repeat(rating);
}

// Function to create client card HTML
function createClientCard(client) {
  return `
    <article class="client-card">
      <div class="client-header">
        <div class="client-image-container">
          <img
            src="${client.image}"
            alt="${client.name}"
            class="client-image"
            loading="lazy"
          />
        </div>
        <div class="client-info">
          <h3 class="client-name">${client.name}</h3>
          <p class="client-role">${client.role}</p>
          <div class="client-rating">
            <span class="star">${createStarRating(client.rating)}</span>
          </div>
        </div>
      </div>
      
      <blockquote class="client-testimonial">
        "${client.testimonial}"
      </blockquote>
      
      <p class="client-purchase">
        Purchased: <span class="purchased-item">${client.purchasedItem}</span>
      </p>
    </article>
  `;
}

// Function to render all client testimonials
function renderClientTestimonials() {
  const clientGrid = document.getElementById('clientGrid');
  clientGrid.innerHTML = clientTestimonials.map(client => createClientCard(client)).join('');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', renderClientTestimonials);