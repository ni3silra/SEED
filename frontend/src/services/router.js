/**
 * Simple Router for SEED Platform
 * Handles navigation between login and dashboard
 */

import authService from './authService.js';
import { LoginPage } from '../components/LoginPage.js';
import { InvesteeDashboard } from '../components/InvesteeDashboard.js';
import { LanguageSelectionPage } from '../components/LanguageSelectionPage.js';
import { HomePage } from '../components/HomePage.js';

class Router {
  constructor() {
    this.currentRoute = null;
    this.homePage = new HomePage();
    this.loginPage = new LoginPage();
    this.languageSelectionPage = new LanguageSelectionPage();
  }

  /**
   * Initialize the router
   */
  init() {
    try {
      this.checkAuthentication();
    } catch (error) {
      console.error('Router initialization error:', error);
      this.showHomePage(); // Fallback to homepage on error
    }
  }

  /**
   * Check if user is authenticated and route accordingly
   */
  checkAuthentication() {
    const user = authService.getCurrentUser();
    
    if (user && user.isAuthenticated) {
      this.showDashboard(user);
    } else {
      this.showHomePage();
    }
  }

  /**
   * Show homepage for unauthenticated users
   */
  showHomePage() {
    this.currentRoute = 'home';
    const app = document.getElementById('app');
    app.innerHTML = this.homePage.render();
    this.homePage.initializeEventListeners();
  }

  /**
   * Show login page
   */
  showLogin() {
    this.currentRoute = 'login';
    const app = document.getElementById('app');
    app.innerHTML = this.loginPage.render();
    this.loginPage.initializeEventListeners();
  }

  /**
   * Show dashboard based on user role
   */
  showDashboard(user) {
    // Check if user needs language selection first
    if (user.role === 'investee' && LanguageSelectionPage.needsLanguageSelection()) {
      this.showLanguageSelection();
      return;
    }

    this.currentRoute = 'dashboard';
    const app = document.getElementById('app');
    
    if (user.role === 'investee') {
      // Use the new InvesteeDashboard component
      this.currentDashboard = new InvesteeDashboard(user);
      app.innerHTML = this.currentDashboard.render();
      this.currentDashboard.initializeEventListeners();
    } else {
      // Keep placeholder for investor dashboard
      app.innerHTML = this.renderInvestorDashboard(user);
      // Make logout function available
      window.logout = () => this.logout();
    }
  }

  /**
   * Show language selection page
   */
  showLanguageSelection() {
    this.currentRoute = 'language-selection';
    const app = document.getElementById('app');
    app.innerHTML = this.languageSelectionPage.render();
    this.languageSelectionPage.initializeEventListeners();
    
    // Make router available globally for language selection page
    window.router = this;
  }

  /**
   * Render investor dashboard placeholder
   * @param {Object} user - User object
   * @returns {string} - HTML string
   */
  renderInvestorDashboard(user) {
    return `
      <div class="min-h-screen bg-neutral-50">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b border-neutral-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <h1 class="text-xl font-semibold text-neutral-800">SEED Platform</h1>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="text-sm text-neutral-600">
                  <span class="font-medium">${user.profile.name}</span>
                  <span class="text-neutral-400 ml-2">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                </div>
                <button onclick="logout()" 
                        class="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-2 rounded-lg text-sm transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- Welcome Section -->
          <div class="bg-gradient-to-r from-primary-600 to-success-600 rounded-2xl p-8 text-white mb-8">
            <h2 class="text-3xl font-bold mb-2">Welcome back, ${user.profile.name}!</h2>
            <p class="text-primary-100 text-lg">Ready to make a positive impact through investment?</p>
          </div>

          <!-- Dashboard Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            ${this.renderDashboardCards(user)}
          </div>

          <!-- Coming Soon Section -->
          <div class="bg-white rounded-xl shadow-sm p-8">
            <h3 class="text-2xl font-bold text-neutral-800 mb-4">Your Investor Dashboard</h3>
            <p class="text-neutral-600 mb-6">
              We're building an amazing experience for you. Here's what's coming:
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              ${this.renderFeatureList(user)}
            </div>
            
            <div class="mt-8 p-6 bg-neutral-50 rounded-lg">
              <h4 class="font-medium text-neutral-800 mb-2">Development Status</h4>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-neutral-600">Authentication System</span>
                  <span class="bg-success-100 text-success-700 px-2 py-1 rounded text-xs font-medium">Complete</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-neutral-600">Investee Dashboard</span>
                  <span class="bg-success-100 text-success-700 px-2 py-1 rounded text-xs font-medium">Complete</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-neutral-600">Investor Dashboard</span>
                  <span class="bg-warning-100 text-warning-700 px-2 py-1 rounded text-xs font-medium">Planned</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    `;
  }

  /**
   * Render dashboard cards based on user role
   */
  renderDashboardCards(user) {
    if (user.role === 'investee') {
      return `
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-neutral-800">Financial Overview</h3>
          </div>
          <p class="text-neutral-600 text-sm">Track your income and expenses with visual charts</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-neutral-800">Credit Score</h3>
          </div>
          <p class="text-neutral-600 text-sm">Check your eligibility for loans $50-$5000</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-neutral-800">Community</h3>
          </div>
          <p class="text-neutral-600 text-sm">Read inspiring success stories from others</p>
        </div>
      `;
    } else {
      return `
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-neutral-800">Investment Portfolio</h3>
          </div>
          <p class="text-neutral-600 text-sm">Track your investments and returns</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-neutral-800">Impact Metrics</h3>
          </div>
          <p class="text-neutral-600 text-sm">See the positive impact of your investments</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h3 class="font-semibold text-neutral-800">Opportunities</h3>
          </div>
          <p class="text-neutral-600 text-sm">Discover new investment opportunities</p>
        </div>
      `;
    }
  }

  /**
   * Render feature list based on user role
   */
  renderFeatureList(user) {
    if (user.role === 'investee') {
      return `
        <div>
          <h5 class="font-medium text-neutral-800 mb-3">Financial Management</h5>
          <ul class="space-y-2 text-sm text-neutral-600">
            <li class="flex items-center">
              <svg class="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Visual income/expense tracking
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Excel and photo data upload
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Professional financial reports
            </li>
          </ul>
        </div>
        
        <div>
          <h5 class="font-medium text-neutral-800 mb-3">Loan Services</h5>
          <ul class="space-y-2 text-sm text-neutral-600">
            <li class="flex items-center">
              <svg class="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Credit score assessment
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Loan eligibility ($50-$5000)
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Audio explanations
            </li>
          </ul>
        </div>
      `;
    } else {
      return `
        <div>
          <h5 class="font-medium text-neutral-800 mb-3">Investment Tools</h5>
          <ul class="space-y-2 text-sm text-neutral-600">
            <li class="flex items-center">
              <svg class="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Portfolio management
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Investment opportunities
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Risk assessment tools
            </li>
          </ul>
        </div>
        
        <div>
          <h5 class="font-medium text-neutral-800 mb-3">Impact Tracking</h5>
          <ul class="space-y-2 text-sm text-neutral-600">
            <li class="flex items-center">
              <svg class="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Social impact metrics
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Investee success stories
            </li>
            <li class="flex items-center">
              <svg class="w-4 h-4 text-success-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Community growth tracking
            </li>
          </ul>
        </div>
      `;
    }
  }

  /**
   * Logout user and redirect to homepage
   */
  logout() {
    // Clean up current dashboard if it exists
    if (this.currentDashboard && typeof this.currentDashboard.destroy === 'function') {
      this.currentDashboard.destroy();
      this.currentDashboard = null;
    }
    
    authService.logout();
    this.showHomePage();
  }

  /**
   * Navigate to a specific route
   */
  navigate(route) {
    switch (route) {
      case 'home':
        this.showHomePage();
        break;
      case 'login':
        this.showLogin();
        break;
      case 'dashboard':
        const user = authService.getCurrentUser();
        if (user) {
          this.showDashboard(user);
        } else {
          this.showHomePage();
        }
        break;
      default:
        this.checkAuthentication();
    }
  }
}

export default new Router();