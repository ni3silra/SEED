/**
 * Investee Dashboard Component for SEED Platform
 * Provides financial visualizations, data upload, and health indicators
 */

import Chart from 'chart.js/auto';
import { CreditScoreSection } from './CreditScoreSection.js';
import { TestimonialsSection } from './TestimonialsSection.js';
import translationService from '../services/translationService.js';
import currencyService from '../services/currencyService.js';

export class InvesteeDashboard {
  constructor(user) {
    this.user = user;
    this.charts = {};
    this.mockData = this.generateMockFinancialData();
    this.creditScoreSection = new CreditScoreSection(user, this.mockData);
    this.testimonialsSection = new TestimonialsSection();
  }

  /**
   * Render the complete investee dashboard
   * @returns {string} - HTML string
   */
  render() {
    return `
      <div class="min-h-screen bg-neutral-50">
        ${this.renderHeader()}
        ${this.renderMainContent()}
      </div>
    `;
  }

  /**
   * Render dashboard header with navigation and language dropdown
   * @returns {string} - HTML string
   */
  renderHeader() {
    return `
      <header class="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-50" role="banner">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16 sm:h-20">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3" aria-hidden="true">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <h1 class="text-lg sm:text-xl font-semibold text-neutral-800">SEED</h1>
            </div>

            <nav class="flex items-center space-x-2 sm:space-x-4" role="navigation" aria-label="Main navigation">
              <div class="relative">
                <label for="currency-selector" class="sr-only">Select currency</label>
                <select id="currency-selector" 
                        class="form-input text-sm py-2 pr-8 appearance-none cursor-pointer min-w-0"
                        aria-label="Currency selection">
                  <option value="USD">🇺🇸 USD</option>
                  <option value="EUR">🇪🇺 EUR</option>
                  <option value="GBP">🇬🇧 GBP</option>
                  <option value="INR">🇮🇳 INR</option>
                  <option value="NGN">🇳🇬 NGN</option>
                  <option value="KES">🇰🇪 KES</option>
                  <option value="ZAR">🇿🇦 ZAR</option>
                  <option value="BRL">🇧🇷 BRL</option>
                  <option value="MXN">🇲🇽 MXN</option>
                  <option value="PHP">🇵🇭 PHP</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none" aria-hidden="true">
                  <svg class="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              <div class="relative">
                <label for="language-selector" class="sr-only">Select language</label>
                <select id="language-selector" 
                        class="form-input text-sm py-2 pr-8 appearance-none cursor-pointer min-w-0"
                        aria-label="Language selection">
                  <option value="en">English</option>
                  <option value="de">German</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="pt">Português</option>
                  <option value="hi">हिन्दी</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none" aria-hidden="true">
                  <svg class="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              <div class="hidden sm:block text-sm text-neutral-600">
                <span class="font-medium">${this.user.profile.name}</span>
                <span class="text-neutral-400 ml-2">${this.user.profile.profession}</span>
              </div>

              <button id="logout-btn" 
                      class="btn-secondary text-sm py-2 px-3"
                      aria-label="Logout from SEED">
                <span class="hidden sm:inline">Logout</span>
                <svg class="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </header>
    `;
  }

  /**
   * Render main dashboard content
   * @returns {string} - HTML string
   */
  renderMainContent() {
    return `
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        ${this.renderWelcomeSection()}
        ${this.renderCreditScoreSection()}
        ${this.renderFinancialOverview()}
        ${this.renderChartsSection()}
        ${this.renderDataUploadSection()}
        ${this.renderFinancialHealthSection()}
      </main>
    `;
  }

  /**
   * Render welcome section
   * @returns {string} - HTML string
   */
  renderWelcomeSection() {
    return `
      <section class="bg-gradient-to-r from-primary-600 to-success-600 rounded-2xl p-6 sm:p-8 text-white mb-6 sm:mb-8" aria-labelledby="welcome-heading">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="mb-4 sm:mb-0">
            <h2 id="welcome-heading" class="text-2xl sm:text-3xl font-bold mb-2">Welcome back, ${this.user.profile.name}!</h2>
            <p class="text-primary-100 text-base sm:text-lg">Track your financial journey and discover new opportunities</p>
          </div>
          <div class="hidden md:block" aria-hidden="true">
            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render financial overview cards
   * @returns {string} - HTML string
   */
  renderFinancialOverview() {
    return `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <span class="text-sm text-success-600 bg-success-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 class="text-2xl font-bold text-neutral-800 mb-1">${currencyService.formatAmount(this.mockData.monthlyIncome)}</h3>
          <p class="text-neutral-600 text-sm">Monthly Income</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <span class="text-sm text-warning-600 bg-warning-50 px-2 py-1 rounded-full">-3%</span>
          </div>
          <h3 class="text-2xl font-bold text-neutral-800 mb-1">${currencyService.formatAmount(this.mockData.monthlyExpenses)}</h3>
          <p class="text-neutral-600 text-sm">Monthly Expenses</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <span class="text-sm text-success-600 bg-success-50 px-2 py-1 rounded-full">+25%</span>
          </div>
          <h3 class="text-2xl font-bold text-neutral-800 mb-1">${currencyService.formatAmount(this.mockData.monthlyIncome - this.mockData.monthlyExpenses)}</h3>
          <p class="text-neutral-600 text-sm">Net Savings</p>
        </div>
      </div>
    `;
  }

  /**
   * Render charts section with income/expense visualization
   * @returns {string} - HTML string
   */
  renderChartsSection() {
    return `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-neutral-800">Income vs Expenses</h3>
            <select id="chart-period" class="text-sm border border-neutral-300 rounded-lg px-3 py-1">
              <option value="6months">Last 6 Months</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
          <div class="relative h-64">
            <canvas id="income-expense-chart"></canvas>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
          <h3 class="text-lg font-semibold text-neutral-800 mb-6">Expense Categories</h3>
          <div class="relative h-64">
            <canvas id="expense-categories-chart"></canvas>
          </div>
          <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
            ${this.mockData.expenseCategories.map(category => `
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${category.color}"></div>
                <span class="text-neutral-600">${category.name}: ${currencyService.formatAmount(category.amount)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render data upload section
   * @returns {string} - HTML string
   */
  renderDataUploadSection() {
    return `
      <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200 mb-8">
        <h3 class="text-lg font-semibold text-neutral-800 mb-6">Add Financial Data</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer" id="excel-upload-area">
            <div class="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h4 class="font-medium text-neutral-800 mb-2">Upload Excel File</h4>
            <p class="text-sm text-neutral-600 mb-4">Upload your financial records in Excel format</p>
            <input type="file" id="excel-file-input" accept=".xlsx,.xls,.csv" class="hidden">
            <button onclick="document.getElementById('excel-file-input').click()" 
                    class="bg-success-600 hover:bg-success-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Choose File
            </button>
          </div>

          <div class="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer" id="photo-upload-area">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h4 class="font-medium text-neutral-800 mb-2">Upload Photos</h4>
            <p class="text-sm text-neutral-600 mb-4">Take photos of receipts or financial documents</p>
            <input type="file" id="photo-file-input" accept="image/*" multiple class="hidden">
            <button onclick="document.getElementById('photo-file-input').click()" 
                    class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Take Photo
            </button>
          </div>

          <div class="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer" id="manual-entry-area">
            <div class="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
            <h4 class="font-medium text-neutral-800 mb-2">Manual Entry</h4>
            <p class="text-sm text-neutral-600 mb-4">Enter your financial data manually</p>
            <button id="manual-entry-btn" 
                    class="bg-warning-600 hover:bg-warning-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Add Entry
            </button>
          </div>
        </div>

        <div id="upload-status" class="mt-6 hidden">
          <div class="bg-success-50 border border-success-200 rounded-lg p-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-success-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-success-700 font-medium">Data uploaded successfully!</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render financial health indicators
   * @returns {string} - HTML string
   */
  renderFinancialHealthSection() {
    const healthScore = this.calculateFinancialHealthScore();
    const healthColor = this.getHealthColor(healthScore);
    
    return `
      <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200 mb-8">
        <h3 class="text-lg font-semibold text-neutral-800 mb-6">Financial Health Indicators</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="relative w-24 h-24 mx-auto mb-4">
              <svg class="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#e5e7eb" stroke-width="8" fill="none"/>
                <circle cx="50" cy="50" r="40" stroke="${healthColor}" stroke-width="8" fill="none"
                        stroke-dasharray="${2 * Math.PI * 40}" 
                        stroke-dashoffset="${2 * Math.PI * 40 * (1 - healthScore / 100)}"
                        class="transition-all duration-1000"/>
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-xl font-bold text-neutral-800">${healthScore}%</span>
              </div>
            </div>
            <h4 class="font-medium text-neutral-800 mb-1">Health Score</h4>
            <p class="text-sm text-neutral-600">${this.getHealthDescription(healthScore)}</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h4 class="text-2xl font-bold text-neutral-800 mb-1">${this.mockData.savingsRate}%</h4>
            <p class="text-sm text-neutral-600">Savings Rate</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h4 class="text-2xl font-bold text-neutral-800 mb-1">${this.mockData.debtRatio}%</h4>
            <p class="text-sm text-neutral-600">Debt Ratio</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h4 class="text-2xl font-bold text-neutral-800 mb-1">${this.mockData.emergencyFundMonths}</h4>
            <p class="text-sm text-neutral-600">Months Covered</p>
          </div>
        </div>

        <div class="mt-8 p-4 bg-neutral-50 rounded-lg">
          <h5 class="font-medium text-neutral-800 mb-3">Recommendations for ${this.user.profile.profession}s</h5>
          <div class="space-y-2 text-sm text-neutral-600">
            ${this.getHealthRecommendations().map(rec => `
              <div class="flex items-start">
                <svg class="w-4 h-4 text-primary-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>${rec}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render credit score section using CreditScoreSection component
   * @returns {string} - HTML string
   */
  renderCreditScoreSection() {
    return this.creditScoreSection.render();
  }

  /**
   * Render testimonials section using TestimonialsSection component
   * @returns {string} - HTML string
   */
  renderTestimonialsSection() {
    return this.testimonialsSection.render();
  }

  /**
   * Generate mock financial data
   * @returns {Object} - Mock financial data
   */
  generateMockFinancialData() {
    const professionMultipliers = {
      'Farmer': { income: 800, expenses: 600 },
      'Mechanic': { income: 1200, expenses: 900 },
      'Craftsman': { income: 1000, expenses: 750 },
      'Small Business Owner': { income: 1500, expenses: 1100 },
      'Tailor': { income: 900, expenses: 650 }
    };

    const multiplier = professionMultipliers[this.user.profile.profession] || professionMultipliers['Farmer'];
    
    return {
      monthlyIncome: multiplier.income,
      monthlyExpenses: multiplier.expenses,
      savingsRate: Math.round(((multiplier.income - multiplier.expenses) / multiplier.income) * 100),
      debtRatio: Math.floor(Math.random() * 30) + 10,
      emergencyFundMonths: Math.floor(Math.random() * 4) + 1,
      
      monthlyData: [
        { month: 'Jan', income: multiplier.income * 0.9, expenses: multiplier.expenses * 0.95 },
        { month: 'Feb', income: multiplier.income * 0.95, expenses: multiplier.expenses * 0.9 },
        { month: 'Mar', income: multiplier.income * 1.1, expenses: multiplier.expenses * 1.05 },
        { month: 'Apr', income: multiplier.income * 1.05, expenses: multiplier.expenses * 0.98 },
        { month: 'May', income: multiplier.income * 1.15, expenses: multiplier.expenses * 1.02 },
        { month: 'Jun', income: multiplier.income, expenses: multiplier.expenses }
      ],
      
      expenseCategories: [
        { name: 'Food & Groceries', amount: Math.round(multiplier.expenses * 0.4), color: '#ef4444' },
        { name: 'Transportation', amount: Math.round(multiplier.expenses * 0.2), color: '#f97316' },
        { name: 'Housing', amount: Math.round(multiplier.expenses * 0.25), color: '#eab308' },
        { name: 'Healthcare', amount: Math.round(multiplier.expenses * 0.1), color: '#22c55e' },
        { name: 'Other', amount: Math.round(multiplier.expenses * 0.05), color: '#6366f1' }
      ]
    };
  }

  calculateFinancialHealthScore() {
    const savingsScore = Math.min(this.mockData.savingsRate * 2, 40);
    const debtScore = Math.max(40 - this.mockData.debtRatio, 0);
    const emergencyScore = Math.min(this.mockData.emergencyFundMonths * 5, 20);
    return Math.round(savingsScore + debtScore + emergencyScore);
  }

  getHealthColor(score) {
    if (score >= 70) return '#22c55e';
    if (score >= 50) return '#eab308';
    return '#ef4444';
  }

  getHealthDescription(score) {
    if (score >= 70) return 'Excellent';
    if (score >= 50) return 'Good';
    if (score >= 30) return 'Fair';
    return 'Needs Improvement';
  }

  getHealthRecommendations() {
    const profession = this.user.profile.profession;
    const baseRecommendations = [
      'Track daily expenses to identify spending patterns',
      'Set aside 10% of income for emergency savings',
      'Consider diversifying income sources when possible'
    ];

    const professionSpecific = {
      'Farmer': [
        'Plan for seasonal income variations',
        'Invest in crop insurance for protection',
        'Keep detailed records of farming expenses'
      ],
      'Mechanic': [
        'Maintain tools and equipment to reduce costs',
        'Build relationships with parts suppliers',
        'Consider offering mobile repair services'
      ],
      'Craftsman': [
        'Document your work for portfolio building',
        'Explore online marketplaces for wider reach',
        'Invest in quality tools that last longer'
      ]
    };

    return [...baseRecommendations, ...(professionSpecific[profession] || professionSpecific['Farmer'])];
  }

  initializeEventListeners() {
    // Set current currency in selector
    const currencySelector = document.getElementById('currency-selector');
    if (currencySelector) {
      currencySelector.value = currencyService.getCurrentCurrency();
      currencySelector.addEventListener('change', (e) => {
        this.handleCurrencyChange(e.target.value);
      });
    }

    // Set current language in selector
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
      languageSelector.value = translationService.getCurrentLanguage();
      languageSelector.addEventListener('change', (e) => {
        this.handleLanguageChange(e.target.value);
      });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.handleLogout();
      });
    }

    this.initializeFileUploads();

    const manualEntryBtn = document.getElementById('manual-entry-btn');
    if (manualEntryBtn) {
      manualEntryBtn.addEventListener('click', () => {
        this.showManualEntryModal();
      });
    }

    const chartPeriod = document.getElementById('chart-period');
    if (chartPeriod) {
      chartPeriod.addEventListener('change', (e) => {
        this.updateCharts(e.target.value);
      });
    }

    this.initializeCharts();
    this.creditScoreSection.initializeEventListeners();
    this.testimonialsSection.initializeEventListeners();

    // Apply translation if language is not English
    if (translationService.getCurrentLanguage() !== 'en') {
      setTimeout(() => {
        translationService.translatePage();
      }, 100);
    }
  }

  initializeFileUploads() {
    const excelInput = document.getElementById('excel-file-input');
    if (excelInput) {
      excelInput.addEventListener('change', (e) => {
        this.handleFileUpload(e.target.files[0], 'excel');
      });
    }

    const photoInput = document.getElementById('photo-file-input');
    if (photoInput) {
      photoInput.addEventListener('change', (e) => {
        this.handleFileUpload(e.target.files, 'photo');
      });
    }

    ['excel-upload-area', 'photo-upload-area'].forEach(areaId => {
      const area = document.getElementById(areaId);
      if (area) {
        area.addEventListener('dragover', (e) => {
          e.preventDefault();
          area.classList.add('border-primary-400', 'bg-primary-50');
        });

        area.addEventListener('dragleave', (e) => {
          e.preventDefault();
          area.classList.remove('border-primary-400', 'bg-primary-50');
        });

        area.addEventListener('drop', (e) => {
          e.preventDefault();
          area.classList.remove('border-primary-400', 'bg-primary-50');
          const files = e.dataTransfer.files;
          if (files.length > 0) {
            const fileType = areaId.includes('excel') ? 'excel' : 'photo';
            this.handleFileUpload(files[0], fileType);
          }
        });
      }
    });
  }

  initializeCharts() {
    this.createIncomeExpenseChart();
    this.createExpenseCategoriesChart();
  }

  createIncomeExpenseChart() {
    const ctx = document.getElementById('income-expense-chart');
    if (!ctx) return;

    this.charts.incomeExpense = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.mockData.monthlyData.map(d => d.month),
        datasets: [
          {
            label: 'Income',
            data: this.mockData.monthlyData.map(d => d.income),
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          },
          {
            label: 'Expenses',
            data: this.mockData.monthlyData.map(d => d.expenses),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = currencyService.formatAmount(context.parsed.y);
                return `${label}: ${value}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return currencyService.formatAmount(value);
              }
            }
          }
        },
        elements: {
          point: {
            radius: 6,
            hoverRadius: 8
          }
        }
      }
    });
  }

  createExpenseCategoriesChart() {
    const ctx = document.getElementById('expense-categories-chart');
    if (!ctx) return;

    this.charts.expenseCategories = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.mockData.expenseCategories.map(c => c.name),
        datasets: [{
          data: this.mockData.expenseCategories.map(c => c.amount),
          backgroundColor: this.mockData.expenseCategories.map(c => c.color),
          borderWidth: 0,
          hoverBorderWidth: 2,
          hoverBorderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = currencyService.formatAmount(context.parsed);
                return `${label}: ${value}`;
              }
            }
          }
        },
        cutout: '60%'
      }
    });
  }

  handleCurrencyChange(currency) {
    currencyService.setCurrency(currency);
    this.showNotification('Currency updated successfully!', 'success');
    
    // Update all currency displays dynamically
    this.updateCurrencyDisplays();
    
    // Update charts with new currency formatting
    this.updateCharts();
    
    // Update credit score section
    this.creditScoreSection.updateCurrencyDisplays();
  }

  /**
   * Update all currency displays on the dashboard
   */
  updateCurrencyDisplays() {
    // Update financial overview cards
    const overviewCards = document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-3 .bg-white h3');
    if (overviewCards.length >= 3) {
      overviewCards[0].textContent = currencyService.formatAmount(this.mockData.monthlyIncome);
      overviewCards[1].textContent = currencyService.formatAmount(this.mockData.monthlyExpenses);
      overviewCards[2].textContent = currencyService.formatAmount(this.mockData.monthlyIncome - this.mockData.monthlyExpenses);
    }

    // Update expense categories display
    const expenseCategories = document.querySelectorAll('#expense-categories-chart + .mt-4 .text-neutral-600');
    expenseCategories.forEach((element, index) => {
      if (this.mockData.expenseCategories[index]) {
        const category = this.mockData.expenseCategories[index];
        element.textContent = `${category.name}: ${currencyService.formatAmount(category.amount)}`;
      }
    });
  }

  handleLanguageChange(language) {
    translationService.setLanguage(language);
    this.showNotification('Language updated successfully!', 'success');
    
    // Apply translation to the page
    if (language !== 'en') {
      setTimeout(() => {
        translationService.translatePage(language);
      }, 100);
    } else {
      // Reload page to show original English content
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }

  handleLogout() {
    sessionStorage.removeItem('seed_user');
    sessionStorage.removeItem('seed_language');
    window.location.reload();
  }

  handleFileUpload(files, type) {
    console.log(`Uploading ${type} files:`, files);
    this.showNotification(`${type} file uploaded successfully!`, 'success');
    
    const statusDiv = document.getElementById('upload-status');
    if (statusDiv) {
      statusDiv.classList.remove('hidden');
      setTimeout(() => {
        statusDiv.classList.add('hidden');
      }, 3000);
    }
  }

  showManualEntryModal() {
    console.log('Opening manual entry modal');
    this.showNotification('Manual entry feature coming soon!', 'info');
  }

  updateCharts(period = '6months') {
    // Destroy existing charts
    if (this.charts.incomeExpense) {
      this.charts.incomeExpense.destroy();
    }
    if (this.charts.expenseCategories) {
      this.charts.expenseCategories.destroy();
    }
    
    // Recreate charts with updated currency formatting
    this.createIncomeExpenseChart();
    this.createExpenseCategoriesChart();
    
    console.log(`Charts updated for period: ${period} with currency: ${currencyService.getCurrentCurrency()}`);
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-success-100 text-success-800 border border-success-200' :
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