/**
 * Login Page Component for SEED Platform
 * Handles phone authentication with OTP verification
 */

import authService from '../services/authService.js';

export class LoginPage {
  constructor() {
    this.currentStep = 'phone'; // 'phone', 'otp'
    this.phoneNumber = '';
    this.selectedRole = 'investee';
    this.selectedCurrency = 'USD';
    this.isLoading = false;
  }

  /**
   * Render the login page
   * @returns {string} - HTML string
   */
  render() {
    return `
      <div class="min-h-screen bg-gradient-to-br from-primary-50 to-success-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8" role="dialog" aria-labelledby="login-title" aria-describedby="login-description">
          <!-- Header -->
          <header class="text-center mb-6 sm:mb-8">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="SEED logo">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h1 id="login-title" class="text-2xl sm:text-3xl font-bold text-neutral-800 mb-2">Welcome to SEED</h1>
            <p id="login-description" class="text-neutral-600 text-sm sm:text-base">Growing financial opportunities from small beginnings</p>
          </header>

          <!-- Login Form -->
          <main id="login-form" aria-live="polite">
            ${this.currentStep === 'phone' ? this.renderPhoneStep() : this.renderOTPStep()}
          </main>

          <!-- Loading Overlay -->
          <div id="loading-overlay" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-labelledby="loading-title" aria-modal="true">
            <div class="bg-white rounded-lg p-6 text-center max-w-sm mx-4">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4" aria-hidden="true"></div>
              <p id="loading-title" class="text-neutral-600">Processing...</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render phone number input step
   * @returns {string} - HTML string
   */
  renderPhoneStep() {
    return `
      <form id="phone-form" class="space-y-4 sm:space-y-6" novalidate>
        <!-- Role Selection -->
        <fieldset>
          <legend class="block text-sm font-medium text-neutral-700 mb-3">I am a:</legend>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button type="button" 
                    class="role-btn ${this.selectedRole === 'investee' ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-700'} 
                           border-2 ${this.selectedRole === 'investee' ? 'border-primary-600' : 'border-neutral-200'} 
                           rounded-lg p-3 sm:p-4 text-center transition-all duration-200 hover:border-primary-400 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    data-role="investee"
                    aria-pressed="${this.selectedRole === 'investee'}"
                    aria-describedby="investee-description">
              <div class="font-medium text-sm sm:text-base">Investee</div>
              <div id="investee-description" class="text-xs sm:text-sm opacity-75">Seeking loans</div>
            </button>
            <button type="button" 
                    class="role-btn ${this.selectedRole === 'investor' ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-700'} 
                           border-2 ${this.selectedRole === 'investor' ? 'border-primary-600' : 'border-neutral-200'} 
                           rounded-lg p-3 sm:p-4 text-center transition-all duration-200 hover:border-primary-400 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    data-role="investor"
                    aria-pressed="${this.selectedRole === 'investor'}"
                    aria-describedby="investor-description">
              <div class="font-medium text-sm sm:text-base">Investor</div>
              <div id="investor-description" class="text-xs sm:text-sm opacity-75">Providing funds</div>
            </button>
          </div>
        </fieldset>

        <!-- Currency Selection -->
        <div>
          <label for="currency" class="block text-sm font-medium text-neutral-700 mb-2">
            Preferred Currency <span class="text-red-500" aria-label="required">*</span>
          </label>
          <div class="relative">
            <select id="currency" 
                    name="currency"
                    class="form-input appearance-none pr-10"
                    aria-describedby="currency-help"
                    required>
              <option value="USD" ${this.selectedCurrency === 'USD' ? 'selected' : ''}>🇺🇸 USD - US Dollar</option>
              <option value="EUR" ${this.selectedCurrency === 'EUR' ? 'selected' : ''}>🇪🇺 EUR - Euro</option>
              <option value="GBP" ${this.selectedCurrency === 'GBP' ? 'selected' : ''}>🇬🇧 GBP - British Pound</option>
              <option value="INR" ${this.selectedCurrency === 'INR' ? 'selected' : ''}>🇮🇳 INR - Indian Rupee</option>
              <option value="NGN" ${this.selectedCurrency === 'NGN' ? 'selected' : ''}>🇳🇬 NGN - Nigerian Naira</option>
              <option value="KES" ${this.selectedCurrency === 'KES' ? 'selected' : ''}>🇰🇪 KES - Kenyan Shilling</option>
              <option value="ZAR" ${this.selectedCurrency === 'ZAR' ? 'selected' : ''}>🇿🇦 ZAR - South African Rand</option>
              <option value="BRL" ${this.selectedCurrency === 'BRL' ? 'selected' : ''}>🇧🇷 BRL - Brazilian Real</option>
              <option value="MXN" ${this.selectedCurrency === 'MXN' ? 'selected' : ''}>🇲🇽 MXN - Mexican Peso</option>
              <option value="PHP" ${this.selectedCurrency === 'PHP' ? 'selected' : ''}>🇵🇭 PHP - Philippine Peso</option>
            </select>
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" aria-hidden="true">
              <svg class="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          <p id="currency-help" class="mt-2 text-sm text-neutral-500">Select your preferred currency for financial displays</p>
        </div>

        <!-- Phone Number Input -->
        <div>
          <label for="phone" class="block text-sm font-medium text-neutral-700 mb-2">
            Phone Number <span class="text-red-500" aria-label="required">*</span>
          </label>
          <div class="relative">
            <input type="tel" 
                   id="phone" 
                   name="phone"
                   class="form-input"
                   placeholder="Enter Dummy Number"
                   pattern="[0-9]{10}"
                   value="${this.phoneNumber}"
                   default="9876543210"
                   aria-describedby="phone-help phone-error"
                   autocomplete="tel"
                   required>
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" aria-hidden="true">
              <svg class="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
          </div>
          <p id="phone-help" class="mt-2 text-sm text-neutral-500">We'll send you a verification code</p>
          <div id="phone-error" class="mt-1 text-sm text-red-600 hidden" role="alert" aria-live="polite"></div>
        </div>

        <!-- Submit Button -->
        <button type="submit" 
                class="btn-primary w-full"
                aria-describedby="submit-help">
          <span>Send Verification Code</span>
        </button>
        <p id="submit-help" class="text-xs text-neutral-500 text-center">By continuing, you agree to our terms of service</p>
      </form>
    `;
  }

  /**
   * Render OTP verification step
   * @returns {string} - HTML string
   */
  renderOTPStep() {
    return `
      <form id="otp-form" class="space-y-4 sm:space-y-6" novalidate>
        <!-- Back Button -->
        <button type="button" id="back-btn" 
                class="flex items-center text-primary-600 hover:text-primary-700 focus:text-primary-700 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg p-1"
                aria-label="Go back to phone number entry">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span>Back</span>
        </button>

        <!-- OTP Info -->
        <div class="text-center">
          <div class="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
            <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-neutral-800 mb-2">Verification Code Sent</h3>
          <p class="text-neutral-600 mb-1 text-sm sm:text-base">Enter the 6-digit code sent to</p>
          <p class="font-medium text-neutral-800 text-sm sm:text-base">${this.phoneNumber}</p>
                  <div class="mt-3 p-3 bg-neutral-50 rounded-lg">
            <p class="text-sm text-neutral-600">For demo: use code <span class="font-mono font-bold text-primary-600">908978</span></p>
          </div>
          </div>

        <!-- OTP Input -->
        <div>
          <label for="otp" class="block text-sm font-medium text-neutral-700 mb-2">
            Verification Code <span class="text-red-500" aria-label="required">*</span>
          </label>
          <input type="text" 
                 id="otp" 
                 name="otp"
                 class="form-input text-center text-lg font-mono tracking-widest"
                 placeholder="000000"
                 maxlength="6"
                 autocomplete="one-time-code"
                 inputmode="numeric"
                 pattern="[0-9]{6}"
                 aria-describedby="otp-help otp-error"
                 required>
          <p id="otp-help" class="mt-2 text-sm text-neutral-500">Enter the 6-digit verification code</p>
          <div id="otp-error" class="mt-1 text-sm text-red-600 hidden" role="alert" aria-live="polite"></div>
        </div>

        <!-- Submit Button -->
        <button type="submit" 
                class="btn-primary w-full">
          <span>Verify & Login</span>
        </button>

        <!-- Resend Link -->
        <div class="text-center">
          <button type="button" id="resend-btn" 
                  class="text-primary-600 hover:text-primary-700 focus:text-primary-700 text-sm transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg p-2"
                  aria-describedby="resend-help">
            Didn't receive the code? Resend
          </button>
          <p id="resend-help" class="text-xs text-neutral-500 mt-1">You can request a new code if needed</p>
        </div>
      </form>
    `;
  }

  /**
   * Initialize event listeners
   */
  initializeEventListeners() {
    // Role selection
    document.querySelectorAll('.role-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.selectedRole = btn.dataset.role;
        this.updateRoleButtons();
      });
    });

    // Currency selection
    const currencySelect = document.getElementById('currency');
    if (currencySelect) {
      currencySelect.addEventListener('change', (e) => {
        this.selectedCurrency = e.target.value;
      });
    }

    // Phone form submission
    const phoneForm = document.getElementById('phone-form');
    if (phoneForm) {
      phoneForm.addEventListener('submit', (e) => this.handlePhoneSubmit(e));
    }

    // OTP form submission
    const otpForm = document.getElementById('otp-form');
    if (otpForm) {
      otpForm.addEventListener('submit', (e) => this.handleOTPSubmit(e));
    }

    // Back button
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => this.goBackToPhone());
    }

    // Resend button
    const resendBtn = document.getElementById('resend-btn');
    if (resendBtn) {
      resendBtn.addEventListener('click', () => this.resendOTP());
    }

    // OTP input formatting
    const otpInput = document.getElementById('otp');
    if (otpInput) {
      otpInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
      });
    }
  }

  /**
   * Update role button states
   */
  updateRoleButtons() {
    document.querySelectorAll('.role-btn').forEach(btn => {
      const isSelected = btn.dataset.role === this.selectedRole;
      btn.className = `role-btn ${isSelected ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-700'} 
                     border-2 ${isSelected ? 'border-primary-600' : 'border-neutral-200'} 
                     rounded-lg p-4 text-center transition-all hover:border-primary-400`;
    });
  }

  /**
   * Handle phone form submission
   */
  async handlePhoneSubmit(e) {
    e.preventDefault();

    const phoneInput = document.getElementById('phone');
    const phone = phoneInput.value.trim();

    if (!phone || phone.length < 10) {
      this.showError('Please enter a valid phone number');
      return;
    }

    this.showLoading(true);

    try {
      const success = await authService.sendOTP(phone);
      if (success) {
        this.phoneNumber = phone;
        this.currentStep = 'otp';
        this.updateLoginForm();
      } else {
        this.showError('Failed to send verification code. Please try again.');
      }
    } catch (error) {
      this.showError('An error occurred. Please try again.');
    } finally {
      this.showLoading(false);
    }
  }

  /**
   * Handle OTP form submission
   */
  async handleOTPSubmit(e) {
    e.preventDefault();

    const otpInput = document.getElementById('otp');
    const otp = otpInput.value.trim();

    if (!otp || otp.length !== 6) {
      this.showError('Please enter a valid 6-digit code');
      return;
    }

    this.showLoading(true);

    try {
      const user = await authService.verifyOTP(this.phoneNumber, otp, this.selectedRole, this.selectedCurrency);
      if (user) {
        // Redirect directly to dashboard using router
        this.redirectToDashboard(user);
      } else {
        this.showError('Invalid verification code. Please try again.');
        otpInput.value = '';
      }
    } catch (error) {
      this.showError('An error occurred. Please try again.');
    } finally {
      this.showLoading(false);
    }
  }

  /**
   * Go back to phone input step
   */
  goBackToPhone() {
    this.currentStep = 'phone';
    this.updateLoginForm();
  }

  /**
   * Resend OTP
   */
  async resendOTP() {
    this.showLoading(true);
    try {
      await authService.sendOTP(this.phoneNumber);
      this.showSuccess('Verification code sent again!');
    } catch (error) {
      this.showError('Failed to resend code. Please try again.');
    } finally {
      this.showLoading(false);
    }
  }

  /**
   * Update login form content
   */
  updateLoginForm() {
    const loginForm = document.getElementById('login-form');
    loginForm.innerHTML = this.currentStep === 'phone' ? this.renderPhoneStep() : this.renderOTPStep();
    this.initializeEventListeners();
  }

  /**
   * Show loading state
   */
  showLoading(show) {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) {
      console.warn('Loading overlay element not found');
      return;
    }

    if (show) {
      overlay.classList.remove('hidden');
    } else {
      overlay.classList.add('hidden');
    }
  }

  /**
   * Show error message
   */
  showError(message) {
    // Remove existing alerts
    this.removeAlerts();

    const alert = document.createElement('div');
    alert.className = 'alert bg-warning-50 border border-warning-200 text-warning-700 px-4 py-3 rounded-lg mb-4';
    alert.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        ${message}
      </div>
    `;

    const loginForm = document.getElementById('login-form');
    loginForm.insertBefore(alert, loginForm.firstChild);
  }

  /**
   * Show success message
   */
  showSuccess(message) {
    // Remove existing alerts
    this.removeAlerts();

    const alert = document.createElement('div');
    alert.className = 'alert bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg mb-4';
    alert.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        ${message}
      </div>
    `;

    const loginForm = document.getElementById('login-form');
    loginForm.insertBefore(alert, loginForm.firstChild);
  }

  /**
   * Remove existing alert messages
   */
  removeAlerts() {
    document.querySelectorAll('.alert').forEach(alert => alert.remove());
  }



  /**
   * Redirect to appropriate dashboard based on user role
   */
  redirectToDashboard(user) {
    // Use the router to navigate to the proper dashboard
    if (window.router) {
      window.router.showDashboard(user);
    } else {
      // Fallback: trigger router initialization
      import('../services/router.js').then(({ default: router }) => {
        router.showDashboard(user);
      });
    }
  }
}