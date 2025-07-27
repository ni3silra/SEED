/**
 * Currency Service for SEED Platform
 * Handles currency formatting and conversion
 */

class CurrencyService {
  constructor() {
    this.currencySymbols = {
      'USD': { symbol: '$', name: 'US Dollar' },
      'EUR': { symbol: '€', name: 'Euro' },
      'GBP': { symbol: '£', name: 'British Pound' },
      'INR': { symbol: '₹', name: 'Indian Rupee' },
      'NGN': { symbol: '₦', name: 'Nigerian Naira' },
      'KES': { symbol: 'KSh', name: 'Kenyan Shilling' },
      'ZAR': { symbol: 'R', name: 'South African Rand' },
      'BRL': { symbol: 'R$', name: 'Brazilian Real' },
      'MXN': { symbol: '$', name: 'Mexican Peso' },
      'PHP': { symbol: '₱', name: 'Philippine Peso' }
    };
  }

  /**
   * Get current currency from sessionStorage
   * @returns {string} - Currency code
   */
  getCurrentCurrency() {
    return sessionStorage.getItem('seed_currency') || 'USD';
  }

  /**
   * Set currency preference
   * @param {string} currency - Currency code
   */
  setCurrency(currency) {
    sessionStorage.setItem('seed_currency', currency);
  }

  /**
   * Get currency symbol
   * @param {string} currency - Currency code
   * @returns {string} - Currency symbol
   */
  getCurrencySymbol(currency = null) {
    const currencyCode = currency || this.getCurrentCurrency();
    return this.currencySymbols[currencyCode]?.symbol || '$';
  }

  /**
   * Get currency name
   * @param {string} currency - Currency code
   * @returns {string} - Currency name
   */
  getCurrencyName(currency = null) {
    const currencyCode = currency || this.getCurrentCurrency();
    return this.currencySymbols[currencyCode]?.name || 'US Dollar';
  }

  /**
   * Format amount with currency symbol
   * @param {number} amount - Amount to format
   * @param {string} currency - Currency code (optional)
   * @returns {string} - Formatted amount with currency symbol
   */
  formatAmount(amount, currency = null) {
    const currencyCode = currency || this.getCurrentCurrency();
    const symbol = this.getCurrencySymbol(currencyCode);
    
    // Format number with commas
    const formattedNumber = amount.toLocaleString();
    
    // Return formatted amount with currency symbol
    return `${symbol}${formattedNumber}`;
  }

  /**
   * Format amount for specific currency with proper locale formatting
   * @param {number} amount - Amount to format
   * @param {string} currency - Currency code (optional)
   * @returns {string} - Formatted amount with proper locale
   */
  formatAmountWithLocale(amount, currency = null) {
    const currencyCode = currency || this.getCurrentCurrency();
    
    try {
      // Use Intl.NumberFormat for proper currency formatting
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    } catch (error) {
      // Fallback to simple formatting if currency is not supported
      return this.formatAmount(amount, currencyCode);
    }
  }

  /**
   * Get all available currencies
   * @returns {Array} - Array of currency objects
   */
  getAvailableCurrencies() {
    return Object.entries(this.currencySymbols).map(([code, info]) => ({
      code,
      symbol: info.symbol,
      name: info.name
    }));
  }

  /**
   * Mock currency conversion (for demo purposes)
   * In a real app, this would call a currency conversion API
   * @param {number} amount - Amount to convert
   * @param {string} fromCurrency - Source currency
   * @param {string} toCurrency - Target currency
   * @returns {number} - Converted amount
   */
  convertAmount(amount, fromCurrency, toCurrency) {
    // Mock conversion rates (for demo only)
    const mockRates = {
      'USD': 1,
      'EUR': 0.85,
      'GBP': 0.73,
      'INR': 83,
      'NGN': 460,
      'KES': 110,
      'ZAR': 18,
      'BRL': 5.2,
      'MXN': 18,
      'PHP': 56
    };

    const fromRate = mockRates[fromCurrency] || 1;
    const toRate = mockRates[toCurrency] || 1;
    
    // Convert to USD first, then to target currency
    const usdAmount = amount / fromRate;
    return Math.round(usdAmount * toRate);
  }
}

export default new CurrencyService();