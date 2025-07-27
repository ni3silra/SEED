/**
 * Mock Authentication Service for SEED Platform
 * Handles phone-based authentication with OTP verification
 */

class AuthService {
  constructor() {
    this.currentUser = null;
    this.MOCK_OTP = '908978';
  }

  /**
   * Simulate sending OTP to phone number
   * @param {string} phoneNumber - User's phone number
   * @returns {Promise<boolean>} - Success status
   */
  async sendOTP(phoneNumber) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Accept any phone number format
    if (phoneNumber && phoneNumber.length >= 10) {
      console.log(`Mock OTP sent to ${phoneNumber}: ${this.MOCK_OTP}`);
      return true;
    }
    return false;
  }

  /**
   * Verify OTP and authenticate user
   * @param {string} phoneNumber - User's phone number
   * @param {string} otp - OTP entered by user
   * @param {string} role - User role (investor/investee)
   * @param {string} currency - User's preferred currency
   * @returns {Promise<Object|null>} - User object or null if failed
   */
  async verifyOTP(phoneNumber, otp, role, currency = 'USD') {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (otp === this.MOCK_OTP) {
      const user = {
        id: `user_${Date.now()}`,
        phoneNumber,
        role,
        currency,
        isAuthenticated: true,
        profile: {
          name: this.generateMockName(role),
          profession: this.generateMockProfession(role),
          location: 'Mock City'
        }
      };
      
      this.currentUser = user;
      this.saveUserSession(user);
      this.saveCurrencyPreference(currency);
      return user;
    }
    
    return null;
  }

  /**
   * Save currency preference to sessionStorage
   * @param {string} currency - Currency code
   */
  saveCurrencyPreference(currency) {
    sessionStorage.setItem('seed_currency', currency);
  }

  /**
   * Get currency preference from sessionStorage
   * @returns {string} - Currency code
   */
  getCurrencyPreference() {
    return sessionStorage.getItem('seed_currency') || 'USD';
  }

  /**
   * Get current authenticated user
   * @returns {Object|null} - Current user or null
   */
  getCurrentUser() {
    if (!this.currentUser) {
      this.currentUser = this.loadUserSession();
    }
    return this.currentUser;
  }

  /**
   * Logout current user
   */
  logout() {
    this.currentUser = null;
    sessionStorage.removeItem('seed_user');
  }

  /**
   * Save user session to sessionStorage
   * @param {Object} user - User object
   */
  saveUserSession(user) {
    sessionStorage.setItem('seed_user', JSON.stringify(user));
  }

  /**
   * Load user session from sessionStorage
   * @returns {Object|null} - User object or null
   */
  loadUserSession() {
    const userData = sessionStorage.getItem('seed_user');
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Generate mock name based on role
   * @param {string} role - User role
   * @returns {string} - Mock name
   */
  generateMockName(role) {
    const names = {
      investee: ['Maria Santos', 'John', 'Sarah', 'David'],
      investor: ['Robert Johnson', 'Lisa Chen', 'Michael Brown', 'Jennifer Davis']
    };
    const roleNames = names[role] || names.investee;
    return roleNames[Math.floor(Math.random() * roleNames.length)];
  }

  /**
   * Generate mock profession based on role
   * @param {string} role - User role
   * @returns {string} - Mock profession
   */
  generateMockProfession(role) {
    if (role === 'investor') {
      return 'Investor';
    }
    
    const professions = ['Farmer', 'Mechanic', 'Craftsman', 'Small Business Owner', 'Tailor'];
    return professions[Math.floor(Math.random() * professions.length)];
  }

  /**
   * Get motivational welcome message
   * @param {Object} user - User object
   * @returns {string} - Welcome message
   */
  getWelcomeMessage(user) {
    const messages = {
      investee: [
        `Welcome back, ${user.profile.name}! Your financial journey continues today.`,
        `Hello ${user.profile.name}! Every small step leads to big opportunities.`,
        `Great to see you, ${user.profile.name}! Let's grow your financial future together.`,
        `Welcome ${user.profile.name}! Your dedication to financial growth inspires us.`
      ],
      investor: [
        `Welcome back, ${user.profile.name}! Ready to make a positive impact?`,
        `Hello ${user.profile.name}! Your investments change lives.`,
        `Great to see you, ${user.profile.name}! Let's create opportunities together.`,
        `Welcome ${user.profile.name}! Thank you for supporting financial inclusion.`
      ]
    };
    
    const roleMessages = messages[user.role] || messages.investee;
    return roleMessages[Math.floor(Math.random() * roleMessages.length)];
  }
}

export default new AuthService();