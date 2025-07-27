/**
 * Testimonials Section Component for SEED Platform
 * Displays inspiring success stories from low-income community members
 */

export class TestimonialsSection {
  constructor() {
    this.testimonials = this.generateMockTestimonials();
  }

  /**
   * Render the testimonials section
   * @returns {string} - HTML string
   */
  render() {
    return `
      <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-neutral-800">Community Success Stories</h3>
          <div class="flex items-center text-sm text-neutral-600">
            <svg class="w-4 h-4 text-success-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span>Real stories from our community</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${this.testimonials.map(testimonial => this.renderTestimonialCard(testimonial)).join('')}
        </div>

        <div class="mt-8 text-center">
          <button id="load-more-testimonials" 
                  class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Load More Stories
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Render individual testimonial card
   * @param {Object} testimonial - Testimonial data
   * @returns {string} - HTML string
   */
  renderTestimonialCard(testimonial) {
    return `
      <div class="bg-neutral-50 rounded-lg p-6 border border-neutral-200 hover:shadow-md transition-shadow">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-success-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
            ${testimonial.name.charAt(0)}
          </div>
          <div>
            <h4 class="font-semibold text-neutral-800">${testimonial.name}</h4>
            <p class="text-sm text-neutral-600">${testimonial.profession}</p>
            <p class="text-xs text-neutral-500">${testimonial.location}</p>
          </div>
        </div>

        <blockquote class="text-neutral-700 mb-4 italic">
          "${testimonial.story}"
        </blockquote>

        <div class="border-t border-neutral-200 pt-4">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="text-center">
              <div class="font-bold text-success-600 text-lg">$${testimonial.impact.loanAmount}</div>
              <div class="text-neutral-600">Loan Amount</div>
            </div>
            <div class="text-center">
              <div class="font-bold text-primary-600 text-lg">${testimonial.impact.businessGrowth}</div>
              <div class="text-neutral-600">Growth</div>
            </div>
          </div>
          <div class="mt-3 text-center">
            <span class="bg-success-100 text-success-700 px-3 py-1 rounded-full text-xs font-medium">
              Success in ${testimonial.impact.timeframe}
            </span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Generate mock testimonial data
   * @returns {Array} - Array of testimonial objects
   */
  generateMockTestimonials() {
    return [
      {
        id: 1,
        name: "Maria Santos",
        profession: "Farmer",
        location: "Rural Guatemala",
        story: "With my $500 loan from SEED, I bought better seeds and tools. Now my harvest is 40% bigger and I can feed my family better while saving money for the future.",
        impact: {
          loanAmount: 500,
          businessGrowth: "+40%",
          timeframe: "6 months"
        }
      },
      {
        id: 2,
        name: "Ahmed Hassan",
        profession: "Mechanic",
        location: "Cairo, Egypt",
        story: "The $1,200 loan helped me buy professional tools. I can now fix more cars and my income doubled. My children can go to better school now.",
        impact: {
          loanAmount: 1200,
          businessGrowth: "+100%",
          timeframe: "8 months"
        }
      },
      {
        id: 3,
        name: "Priya Sharma",
        profession: "Tailor",
        location: "Mumbai, India",
        story: "Starting with just $300, I bought a sewing machine. Now I have three machines and employ two other women. We're building a small business together.",
        impact: {
          loanAmount: 300,
          businessGrowth: "+200%",
          timeframe: "1 year"
        }
      },
      {
        id: 4,
        name: "Carlos Rodriguez",
        profession: "Craftsman",
        location: "Lima, Peru",
        story: "My $800 loan allowed me to buy quality wood and tools. I now make beautiful furniture that sells in the city. My family's life has completely changed.",
        impact: {
          loanAmount: 800,
          businessGrowth: "+75%",
          timeframe: "10 months"
        }
      },
      {
        id: 5,
        name: "Fatima Al-Zahra",
        profession: "Small Business Owner",
        location: "Marrakech, Morocco",
        story: "With $1,000 from SEED, I opened a small grocery store. Now I serve my community and provide for my family. The audio explanations helped me understand everything.",
        impact: {
          loanAmount: 1000,
          businessGrowth: "+60%",
          timeframe: "7 months"
        }
      },
      {
        id: 6,
        name: "John Okafor",
        profession: "Farmer",
        location: "Lagos, Nigeria",
        story: "The $600 loan helped me buy irrigation equipment. Even during dry season, my crops grow well. I can now support my extended family and save for emergencies.",
        impact: {
          loanAmount: 600,
          businessGrowth: "+85%",
          timeframe: "9 months"
        }
      }
    ];
  }

  /**
   * Initialize event listeners for testimonials section
   */
  initializeEventListeners() {
    const loadMoreBtn = document.getElementById('load-more-testimonials');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.loadMoreTestimonials();
      });
    }
  }

  /**
   * Load more testimonials (mock functionality)
   */
  loadMoreTestimonials() {
    // In a real application, this would fetch more testimonials from an API
    console.log('Loading more testimonials...');

    // Show loading state
    const btn = document.getElementById('load-more-testimonials');
    const originalText = btn.textContent;
    btn.textContent = 'Loading...';
    btn.disabled = true;

    // Simulate loading delay
    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;

      // Show notification that more stories are coming
      this.showNotification('More inspiring stories coming soon!', 'info');
    }, 1500);
  }

  /**
   * Show notification message
   * @param {string} message - Notification message
   * @param {string} type - Notification type (success, info, warning, error)
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${type === 'success' ? 'bg-success-100 text-success-800 border border-success-200' :
      type === 'warning' ? 'bg-warning-100 text-warning-800 border border-warning-200' :
        type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
          'bg-primary-100 text-primary-800 border border-primary-200'
      }`;

    notification.innerHTML = `
      <div class="flex items-center">
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-current opacity-70 hover:opacity-100">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }
}