/**
 * HomePage Component for SEED Platform
 * Landing page shown to unauthenticated users before login
 */

import { TestimonialsSection } from './TestimonialsSection.js';

export class HomePage {
  constructor() {
    this.testimonialsSection = new TestimonialsSection();
  }

  /**
   * Render the complete homepage
   * @returns {string} - HTML string
   */
  render() {
    return `
      <!-- Skip Links for Accessibility -->
      <div class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50">
        <a href="#main-content" class="bg-primary-600 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          Skip to main content
        </a>
        <a href="#get-started-btn" class="bg-primary-600 text-white px-4 py-2 rounded-lg ml-2 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          Skip to get started
        </a>
      </div>

      <div class="min-h-screen bg-gradient-to-br from-primary-50 to-success-50">
        ${this.renderHeroSection()}
        ${this.renderMissionSection()}
        ${this.renderMicroLoanSection()}
        ${this.renderTestimonialsSection()}
        ${this.renderCallToActionSection()}
        ${this.renderFooter()}
      </div>
    `;
  }

  /**
   * Render hero section with SEED branding and value proposition
   * @returns {string} - HTML string
   */
  renderHeroSection() {
    return `
      <section class="relative overflow-hidden" role="banner" aria-labelledby="hero-title">
        <div id="main-content" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div class="text-center">
            <!-- SEED Logo and Branding -->
            <div class="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="SEED logo">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>

            <!-- Main Headline -->
            <h1 id="hero-title" class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-800 mb-6">
              Welcome to <span class="text-primary-600">SEED</span>
            </h1>
            
            <!-- Tagline -->
            <p class="text-xl sm:text-2xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              Sustainable Empowerment Economics Development
            </p>

            <!-- Value Proposition -->
            <p class="text-lg text-neutral-700 mb-10 max-w-2xl mx-auto">
              Growing financial opportunities from small beginnings. Join our community of entrepreneurs building better futures through accessible micro-loans and financial empowerment.
            </p>

            <!-- Primary CTA Button -->
            <button id="get-started-btn" 
                    class="btn-primary text-lg px-8 py-4 mb-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 focus:ring-4 focus:ring-primary-300 focus:ring-offset-2"
                    aria-describedby="get-started-help"
                    type="button">
              Get Started Today
            </button>
            <p id="get-started-help" class="text-sm text-neutral-500">Join thousands building their financial future</p>
          </div>
        </div>

        <!-- Decorative Elements -->
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
          <div class="absolute top-20 left-10 w-20 h-20 bg-success-200 rounded-full opacity-20 animate-bounce-custom"></div>
          <div class="absolute top-40 right-20 w-16 h-16 bg-primary-200 rounded-full opacity-20 animate-bounce-custom" style="animation-delay: 1s;"></div>
          <div class="absolute bottom-20 left-20 w-12 h-12 bg-warning-200 rounded-full opacity-20 animate-bounce-custom" style="animation-delay: 2s;"></div>
        </div>
      </section>
    `;
  }

  /**
   * Render mission section explaining SEED's purpose
   * @returns {string} - HTML string
   */
  renderMissionSection() {
    return `
      <section class="py-16 sm:py-20 bg-white" data-section="mission" aria-labelledby="mission-title">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 id="mission-title" class="text-3xl sm:text-4xl font-bold text-neutral-800 mb-4">
              Our Mission
            </h2>
            <p class="text-lg text-neutral-600 max-w-3xl mx-auto">
              SEED empowers low-income communities through accessible financial services, 
              fostering sustainable economic growth and breaking cycles of poverty.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <!-- Accessibility -->
            <div class="text-center p-4 sm:p-6 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
              <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 class="text-lg sm:text-xl font-semibold text-neutral-800 mb-3">Accessible Finance</h3>
              <p class="text-sm sm:text-base text-neutral-600">
                Simple, transparent financial services designed for everyone, 
                regardless of traditional credit history or banking access.
              </p>
            </div>

            <!-- Community Focus -->
            <div class="text-center p-4 sm:p-6 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
              <div class="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg class="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg sm:text-xl font-semibold text-neutral-800 mb-3">Community Driven</h3>
              <p class="text-sm sm:text-base text-neutral-600">
                Built by and for communities, fostering mutual support and 
                shared success through collaborative financial growth.
              </p>
            </div>

            <!-- Financial Inclusion -->
            <div class="text-center p-4 sm:p-6 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
              <div class="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg class="w-8 h-8 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
              <h3 class="text-lg sm:text-xl font-semibold text-neutral-800 mb-3">Sustainable Growth</h3>
              <p class="text-sm sm:text-base text-neutral-600">
                Long-term economic empowerment through education, mentorship, 
                and progressive financial opportunities that grow with you.
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render colorful micro-loan section highlighting the special offer
   * @returns {string} - HTML string
   */
  renderMicroLoanSection() {
    return `
      <section class="py-16 sm:py-20 bg-gradient-to-r from-primary-600 via-purple-600 to-success-600 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="text-center text-white mb-12">
            <h2 class="text-3xl sm:text-4xl font-bold mb-4">
              Micro-Loans That Grow With You
            </h2>
            <p class="text-xl text-primary-100 max-w-3xl mx-auto">
              Start your journey with our progressive loan program designed to build your financial future step by step.
            </p>
          </div>

          <!-- Special Offer Banner -->
          <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white border-opacity-30">
            <div class="text-center">
              <div class="inline-flex items-center bg-warning-400 text-warning-900 px-6 py-3 rounded-full font-bold text-lg mb-4">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                </svg>
                Special Launch Offer
              </div>
              <h3 class="text-2xl sm:text-3xl font-bold text-white mb-2">
                First 3 Loans are <span class="text-warning-300">Interest-Free!</span>
              </h3>
              <p class="text-lg text-primary-100">
                Build your credit and business with zero interest on your first three loans
              </p>
            </div>
          </div>

          <!-- Loan Program Details -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <!-- Loan Features -->
            <div class="space-y-6">
              <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-success-400 rounded-full flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-success-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-semibold text-white">Loan Range</h4>
                    <p class="text-primary-100">$50 - $5,000</p>
                  </div>
                </div>
                <p class="text-primary-100">
                  Start small and grow big. Our flexible loan amounts adapt to your needs and business growth.
                </p>
              </div>

              <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-warning-400 rounded-full flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-warning-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xl font-semibold text-white">Progressive Rates</h4>
                    <p class="text-primary-100">0% → 1%</p>
                  </div>
                </div>
                <p class="text-primary-100">
                  After your first 3 interest-free loans, enjoy our low 1% flat rate - no hidden fees or compound interest.
                </p>
              </div>
            </div>

            <!-- Visual Loan Calculator -->
            <div class="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-30">
              <h4 class="text-2xl font-bold text-white mb-6 text-center">Your Loan Journey</h4>
              
              <div class="space-y-4">
                <!-- Loan 1-3 -->
                <div class="flex items-center justify-between bg-success-400 bg-opacity-20 rounded-lg p-4">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-success-400 rounded-full flex items-center justify-center text-success-900 font-bold mr-3">
                      1-3
                    </div>
                    <span class="text-white font-medium">First 3 Loans</span>
                  </div>
                  <div class="text-right">
                    <div class="text-success-300 font-bold text-lg">0% Interest</div>
                    <div class="text-success-200 text-sm">Build your credit</div>
                  </div>
                </div>

                <!-- Loan 4+ -->
                <div class="flex items-center justify-between bg-primary-400 bg-opacity-20 rounded-lg p-4">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center text-primary-900 font-bold mr-3">
                      4+
                    </div>
                    <span class="text-white font-medium">Subsequent Loans</span>
                  </div>
                  <div class="text-right">
                    <div class="text-primary-300 font-bold text-lg">0 to 1% Progressive Rate</div>
                    <div class="text-primary-200 text-sm">No compound interest</div>
                  </div>
                </div>
              </div>

              <div class="mt-6 p-4 bg-white bg-opacity-10 rounded-lg">
                <p class="text-center text-primary-100 text-sm">
                  <strong>Example:</strong> $1,000 loan at 1% = $1,010 total repayment
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Background Decorative Elements -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div class="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-5 rounded-full"></div>
          <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white bg-opacity-5 rounded-full"></div>
        </div>
      </section>
    `;
  }

  /**
   * Render testimonials section using existing component
   * @returns {string} - HTML string
   */
  renderTestimonialsSection() {
    return `
      <section class="py-16 sm:py-20 bg-neutral-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-bold text-neutral-800 mb-4">
              Real Stories, Real Impact
            </h2>
            <p class="text-lg text-neutral-600 max-w-3xl mx-auto">
              See how SEED has transformed lives and businesses in communities around the world. 
              These are the stories that inspire us every day.
            </p>
          </div>
          
          <div id="testimonials-container">
            ${this.testimonialsSection.render()}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render call-to-action section
   * @returns {string} - HTML string
   */
  renderCallToActionSection() {
    return `
      <section class="py-16 sm:py-20 bg-gradient-to-r from-success-600 to-primary-600">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p class="text-xl text-success-100 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who have already started building their financial future with SEED. 
            Your success story could be next.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button id="cta-get-started-btn" 
                    class="bg-white text-primary-600 hover:bg-neutral-50 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:ring-4 focus:ring-white focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-primary-600"
                    type="button"
                    aria-describedby="cta-help">
              Get Started Now
            </button>
            <div id="cta-help" class="flex items-center text-success-100">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              <span class="text-sm">Secure • Fast • Trusted</span>
            </div>
          </div>

          <!-- Trust Indicators -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-success-100">
            <div class="flex items-center justify-center">
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span>10,000+ Members</span>
            </div>
            <div class="flex items-center justify-center">
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
              <span>$2M+ Loans Funded</span>
            </div>
            <div class="flex items-center justify-center">
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>95% Success Rate</span>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render footer section
   * @returns {string} - HTML string
   */
  renderFooter() {
    return `
      <footer class="bg-neutral-800 text-neutral-300 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- SEED Branding -->
            <div class="col-span-1 md:col-span-2">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-white">SEED Platform</h3>
              </div>
              <p class="text-neutral-400 mb-4 max-w-md">
                Sustainable Economic Empowerment Development - Growing financial opportunities from small beginnings.
              </p>
              <p class="text-sm text-neutral-500">
                Empowering communities through accessible financial services and sustainable economic growth.
              </p>
            </div>

            <!-- Quick Links -->
            <div>
              <h4 class="text-white font-semibold mb-4">Quick Links</h4>
              <ul class="space-y-2 text-sm">
                <li><button class="hover:text-white transition-colors" onclick="document.getElementById('get-started-btn').scrollIntoView()">Get Started</button></li>
                <li><button class="hover:text-white transition-colors" onclick="document.querySelector('[data-section=mission]')?.scrollIntoView()">Our Mission</button></li>
                <li><button class="hover:text-white transition-colors" onclick="document.querySelector('[data-section=loans]')?.scrollIntoView()">Loan Program</button></li>
                <li><button class="hover:text-white transition-colors" onclick="document.querySelector('[data-section=testimonials]')?.scrollIntoView()">Success Stories</button></li>
              </ul>
            </div>

            <!-- Contact Info -->
            <div>
              <h4 class="text-white font-semibold mb-4">Support</h4>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  support@seed-platform.org
                </li>
                <li class="flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  Available 24/7
                </li>
                <li>
                  <button class="hover:text-white transition-colors text-left">Accessibility Statement</button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Copyright -->
          <div class="border-t border-neutral-700 mt-8 pt-8 text-center">
            <p class="text-sm text-neutral-500">
              © 2025 SEED Platform. All rights reserved. Building sustainable economic empowerment worldwide.
            </p>
          </div>
        </div>
      </footer>
    `;
  }

  /**
   * Initialize event listeners for the homepage
   */
  initializeEventListeners() {
    // Initialize testimonials section event listeners
    this.testimonialsSection.initializeEventListeners();

    // Get Started buttons
    const getStartedBtns = document.querySelectorAll('#get-started-btn, #cta-get-started-btn');
    getStartedBtns.forEach(btn => {
      btn.addEventListener('click', () => this.navigateToLogin());
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.navigateToLogin();
        }
      });
    });

    // Smooth scrolling for internal navigation
    this.initializeSmoothScrolling();
    
    // Initialize accessibility features
    this.initializeAccessibility();
    
    // Add focus management for skip links
    this.initializeSkipLinks();
  }

  /**
   * Initialize smooth scrolling for internal navigation
   */
  initializeSmoothScrolling() {
    // Add data attributes to sections for navigation
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      if (index === 1) section.setAttribute('data-section', 'mission');
      if (index === 2) section.setAttribute('data-section', 'loans');
      if (index === 3) section.setAttribute('data-section', 'testimonials');
    });
  }

  /**
   * Navigate to login page
   */
  navigateToLogin() {
    if (window.router) {
      window.router.navigate('login');
    } else {
      // Fallback: reload page to trigger router
      window.location.reload();
    }
  }

  /**
   * Handle keyboard navigation for accessibility
   */
  handleKeyboardNavigation(event) {
    // Handle Enter and Space key for button-like elements
    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target;
      
      // Handle navigation buttons
      if (target.classList.contains('nav-button')) {
        event.preventDefault();
        this.navigateToLogin();
      }
      
      // Handle smooth scroll navigation
      if (target.classList.contains('scroll-nav')) {
        event.preventDefault();
        const targetSection = target.getAttribute('data-target');
        const section = document.querySelector(`[data-section="${targetSection}"]`);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }

  /**
   * Initialize accessibility features
   */
  initializeAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    
    // Add focus management for screen readers
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
    }
    
    // Announce page changes to screen readers
    this.announcePageLoad();
  }

  /**
   * Announce page load to screen readers
   */
  announcePageLoad() {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = 'SEED homepage loaded. Welcome to Sustainable Economic Empowerment Development platform.';
    document.body.appendChild(announcement);
    
    // Remove announcement after screen readers have processed it
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
  }

  /**
   * Initialize skip links functionality
   */
  initializeSkipLinks() {
    const skipLinks = document.querySelectorAll('a[href^="#"]');
    skipLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Focus the target element for screen readers
          targetElement.focus();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Announce the navigation to screen readers
          const announcement = document.createElement('div');
          announcement.setAttribute('aria-live', 'polite');
          announcement.className = 'sr-only';
          announcement.textContent = `Navigated to ${targetElement.getAttribute('aria-label') || targetId}`;
          document.body.appendChild(announcement);
          
          setTimeout(() => {
            if (announcement.parentNode) {
              announcement.parentNode.removeChild(announcement);
            }
          }, 1000);
        }
      });
    });
  }
}