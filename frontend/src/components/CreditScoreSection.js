/**
 * Credit Score Section Component for SEED Platform
 * Provides credit score display, loan eligibility calculator, and audio explanations
 */

import currencyService from '../services/currencyService.js';

export class CreditScoreSection {
  constructor(user, mockData) {
    this.user = user;
    this.mockData = mockData;
  }

  /**
   * Render credit score and loan eligibility section
   * @returns {string} - HTML string
   */
  render() {
    const creditData = this.generateCreditData();
    const creditColor = this.getCreditScoreColor(creditData.score);
    const loanOptions = this.calculateLoanOptions(creditData);
    
    return `
      <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-neutral-800">Credit Score & Loan Eligibility</h3>
          <button id="credit-audio-btn" 
                  class="flex items-center space-x-2 bg-primary-100 hover:bg-primary-200 text-primary-700 px-3 py-2 rounded-lg text-sm transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M9 9a3 3 0 000 6v-6z"></path>
            </svg>
            <span>Listen</span>
          </button>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="text-center">
            <div class="relative w-40 h-40 mx-auto mb-6">
              <svg class="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="60" stroke="#e5e7eb" stroke-width="12" fill="none"/>
                <circle cx="80" cy="80" r="60" stroke="${creditColor}" stroke-width="12" fill="none"
                        stroke-dasharray="${2 * Math.PI * 60}" 
                        stroke-dashoffset="${2 * Math.PI * 60 * (1 - creditData.score / 850)}"
                        class="transition-all duration-2000 ease-out"
                        stroke-linecap="round"/>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-3xl font-bold text-neutral-800">${creditData.score}</span>
                <span class="text-sm text-neutral-600">out of 850</span>
              </div>
            </div>
            
            <div class="mb-4">
              <div class="flex items-center justify-center space-x-1 mb-2">
                <div class="w-4 h-2 bg-red-500 rounded-sm"></div>
                <div class="w-4 h-2 bg-yellow-500 rounded-sm"></div>
                <div class="w-4 h-2 bg-green-500 rounded-sm"></div>
              </div>
              <p class="text-sm text-neutral-600">
                <span class="font-medium" style="color: ${creditColor}">${this.getCreditScoreDescription(creditData.score)}</span>
                Credit Score
              </p>
            </div>
            
            <div class="bg-neutral-50 rounded-lg p-4">
              <h5 class="font-medium text-neutral-800 mb-3">Score Factors</h5>
              <div class="space-y-2 text-sm">
                ${creditData.factors.map(factor => `
                  <div class="flex items-center justify-between">
                    <span class="text-neutral-600">${factor.name}</span>
                    <div class="flex items-center">
                      <div class="w-16 h-2 bg-neutral-200 rounded-full mr-2">
                        <div class="h-2 rounded-full" 
                             style="width: ${factor.impact}%; background-color: ${this.getFactorColor(factor.impact)}"></div>
                      </div>
                      <span class="text-xs text-neutral-500">${factor.impact}%</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold text-neutral-800 mb-4">Loan Eligibility</h4>
            
            <div class="bg-gradient-to-r from-primary-50 to-success-50 rounded-lg p-6 mb-6">
              <div class="text-center">
                <p class="text-sm text-neutral-600 mb-2">You're eligible for loans up to</p>
                <p class="text-3xl font-bold text-primary-700 mb-2">${currencyService.formatAmount(loanOptions.maxAmount)}</p>
                <p class="text-sm text-neutral-600">Based on your credit score and financial profile</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Loan Amount</label>
                <div class="relative">
                  <input type="range" 
                         id="loan-amount-slider" 
                         min="50" 
                         max="${loanOptions.maxAmount}" 
                         value="${Math.min(500, loanOptions.maxAmount)}"
                         class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider">
                  <div class="flex justify-between text-xs text-neutral-500 mt-1">
                    <span>${currencyService.formatAmount(50)}</span>
                    <span>${currencyService.formatAmount(loanOptions.maxAmount)}</span>
                  </div>
                </div>
                <div class="mt-2 text-center">
                  <span class="text-lg font-semibold text-neutral-800">$</span>
                  <span id="selected-loan-amount" class="text-lg font-semibold text-neutral-800">${Math.min(500, loanOptions.maxAmount)}</span>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Loan Tenure</label>
                <div class="grid grid-cols-3 gap-2">
                  ${loanOptions.tenureOptions.map((tenure, index) => `
                    <button class="tenure-option ${index === 0 ? 'selected' : ''}" 
                            data-months="${tenure.months}"
                            data-rate="${tenure.rate}">
                      <div class="text-sm font-medium">${tenure.months} months</div>
                      <div class="text-xs text-neutral-600">${tenure.rate}% APR</div>
                    </button>
                  `).join('')}
                </div>
              </div>
              
              <div id="loan-summary" class="bg-neutral-50 rounded-lg p-4">
                <h5 class="font-medium text-neutral-800 mb-3">Loan Summary</h5>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-neutral-600">Loan Amount:</span>
                    <span class="font-medium">$<span id="summary-amount">${Math.min(500, loanOptions.maxAmount)}</span></span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-neutral-600">Interest Rate:</span>
                    <span class="font-medium"><span id="summary-rate">${loanOptions.tenureOptions[0].rate}</span>% APR</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-neutral-600">Tenure:</span>
                    <span class="font-medium"><span id="summary-tenure">${loanOptions.tenureOptions[0].months}</span> months</span>
                  </div>
                  <div class="border-t border-neutral-200 pt-2 mt-2">
                    <div class="flex justify-between">
                      <span class="text-neutral-600">Monthly Payment:</span>
                      <span class="font-semibold text-primary-700">$<span id="summary-monthly">0</span></span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-neutral-600">Total Interest:</span>
                      <span class="font-medium">$<span id="summary-interest">0</span></span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button id="apply-loan-btn" 
                      class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                Apply for Loan
              </button>
            </div>
          </div>
        </div>
        
        <div class="mt-8 p-4 bg-neutral-50 rounded-lg">
          <h5 class="font-medium text-neutral-800 mb-3">Tips to Improve Your Credit Score</h5>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-600">
            ${this.getCreditImprovementTips().map(tip => `
              <div class="flex items-start">
                <svg class="w-4 h-4 text-success-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>${tip}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Generate credit score data
   * @returns {Object} - Credit score data
   */
  generateCreditData() {
    const healthScore = this.calculateFinancialHealthScore();
    const baseScore = Math.round(300 + (healthScore / 100) * 550);
    const variation = Math.floor(Math.random() * 100) - 50;
    const finalScore = Math.max(300, Math.min(850, baseScore + variation));
    
    return {
      score: finalScore,
      factors: [
        { name: 'Rent', impact: Math.min(95, 70 + this.mockData.savingsRate) },
        { name: 'Electricity Bills', impact: Math.max(20, 90 - this.mockData.debtRatio) },
        { name: 'Water Bills', impact: 60 + Math.floor(Math.random() * 30) },
        { name: 'Mobile and Others', impact: this.mockData.emergencyFundMonths * 20 + 20 }
      ]
    };
  }

  calculateFinancialHealthScore() {
    const savingsScore = Math.min(this.mockData.savingsRate * 2, 40);
    const debtScore = Math.max(40 - this.mockData.debtRatio, 0);
    const emergencyScore = Math.min(this.mockData.emergencyFundMonths * 5, 20);
    return Math.round(savingsScore + debtScore + emergencyScore);
  }

  getCreditScoreColor(score) {
    if (score >= 700) return '#22c55e';
    if (score >= 600) return '#eab308';
    return '#ef4444';
  }

  getCreditScoreDescription(score) {
    if (score >= 700) return 'Good';
    if (score >= 600) return 'Fair';
    return 'Poor';
  }

  getFactorColor(impact) {
    if (impact >= 80) return '#22c55e';
    if (impact >= 60) return '#eab308';
    return '#ef4444';
  }

  calculateLoanOptions(creditData) {
    const score = creditData.score;
    const monthlyIncome = this.mockData.monthlyIncome;
    
    let maxAmount;
    if (score >= 700) {
      maxAmount = Math.min(5000, monthlyIncome * 6);
    } else if (score >= 600) {
      maxAmount = Math.min(3000, monthlyIncome * 4);
    } else {
      maxAmount = Math.min(1500, monthlyIncome * 2);
    }
    
    maxAmount = Math.max(50, maxAmount);
    const baseRate = score >= 700 ? 0.8 : score >= 600 ? 0.2 : 0.8;
    return {
      maxAmount: Math.round(maxAmount),
      tenureOptions: [
        { months: 6, rate: baseRate },
        { months: 12, rate: baseRate + 2 },
        { months: 24, rate: baseRate + 4 }
      ]
    };
  }

  getCreditImprovementTips() {
    return [
      'Make all payments on time to build positive payment history',
      'Keep your debt-to-income ratio below 30%',
      'Maintain consistent income sources',
      'Build an emergency fund to show financial stability',
      'Avoid taking on too much debt at once',
      'Monitor your credit regularly for accuracy',
      'Consider small loans to build credit history',
      'Keep old accounts open to maintain credit history length'
    ];
  }

  calculateMonthlyPayment(principal, rate, months) {
    const monthlyRate = rate / 100 / 12;
    if (monthlyRate === 0) return principal / months;
    
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(payment);
  }

  speakText(text) {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.startsWith('en') && voice.name.includes('Google')
      ) || voices.find(voice => voice.lang.startsWith('en'));
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      speechSynthesis.speak(utterance);
      return true;
    }
    return false;
  }

  generateCreditAudioExplanation() {
    const creditData = this.generateCreditData();
    const loanOptions = this.calculateLoanOptions(creditData);
    const scoreDescription = this.getCreditScoreDescription(creditData.score);
    
    return `Hello ${this.user.profile.name}. Your current credit score is ${creditData.score} out of 850, which is considered ${scoreDescription}. 
    
    Based on your financial profile as a ${this.user.profile.profession}, you are eligible for loans ranging from 50 to ${loanOptions.maxAmount} dollars. 
    
    Your payment history and income stability are the main factors affecting your score. 
    
    To improve your credit score, focus on making payments on time, keeping your debt low, and maintaining stable income sources. 
    
    The loan options available to you include 6, 12, or 24 month terms with interest rates starting at ${loanOptions.tenureOptions[0].rate} percent annually.
    
    Remember, borrowing responsibly and making timely payments will help improve your credit score over time.`;
  }

  initializeEventListeners() {
    const audioBtn = document.getElementById('credit-audio-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const explanationText = this.generateCreditAudioExplanation();
        const success = this.speakText(explanationText);
        
        if (success) {
          audioBtn.innerHTML = `
            <svg class="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10l3.293 3.293a1 1 0 001.414 0L17 10"></path>
            </svg>
            <span>Speaking...</span>
          `;
          
          setTimeout(() => {
            if (audioBtn) {
              audioBtn.innerHTML = `
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M9 9a3 3 0 000 6v-6z"></path>
                </svg>
                <span>Listen</span>
              `;
            }
          }, 15000);
        }
      });
    }

    const loanSlider = document.getElementById('loan-amount-slider');
    const selectedAmount = document.getElementById('selected-loan-amount');
    
    if (loanSlider && selectedAmount) {
      loanSlider.addEventListener('input', (e) => {
        const amount = parseInt(e.target.value);
        selectedAmount.textContent = amount.toLocaleString();
        this.updateLoanSummary();
      });
    }

    const tenureButtons = document.querySelectorAll('.tenure-option');
    tenureButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        tenureButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        this.updateLoanSummary();
      });
    });

    const applyBtn = document.getElementById('apply-loan-btn');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        this.handleLoanApplication();
      });
    }

    setTimeout(() => {
      this.updateLoanSummary();
    }, 100);
  }

  updateLoanSummary() {
    const loanSlider = document.getElementById('loan-amount-slider');
    const selectedTenure = document.querySelector('.tenure-option.selected');
    
    if (!loanSlider || !selectedTenure) return;
    
    const amount = parseInt(loanSlider.value);
    const months = parseInt(selectedTenure.dataset.months);
    const rate = parseFloat(selectedTenure.dataset.rate);
    
    const monthlyPayment = this.calculateMonthlyPayment(amount, rate, months);
    const totalInterest = (monthlyPayment * months) - amount;
    
    // Update with currency formatting
    const summaryAmount = document.getElementById('summary-amount');
    const summaryMonthly = document.getElementById('summary-monthly');
    const summaryInterest = document.getElementById('summary-interest');
    const summaryRate = document.getElementById('summary-rate');
    const summaryTenure = document.getElementById('summary-tenure');
    
    if (summaryAmount) summaryAmount.textContent = currencyService.formatAmount(amount).replace(/[^\d,]/g, '');
    if (summaryRate) summaryRate.textContent = rate;
    if (summaryTenure) summaryTenure.textContent = months;
    if (summaryMonthly) summaryMonthly.textContent = currencyService.formatAmount(monthlyPayment).replace(/[^\d,]/g, '');
    if (summaryInterest) summaryInterest.textContent = currencyService.formatAmount(Math.round(totalInterest)).replace(/[^\d,]/g, '');
  }

  handleLoanApplication() {
    const loanSlider = document.getElementById('loan-amount-slider');
    const selectedTenure = document.querySelector('.tenure-option.selected');
    
    if (!loanSlider || !selectedTenure) return;
    
    const amount = parseInt(loanSlider.value);
    const months = parseInt(selectedTenure.dataset.months);
    const rate = parseFloat(selectedTenure.dataset.rate);
    const monthlyPayment = this.calculateMonthlyPayment(amount, rate, months);
    
    const confirmationMessage = `
      <div class="bg-success-50 border border-success-200 rounded-lg p-6">
        <div class="flex items-center mb-4">
          <svg class="w-6 h-6 text-success-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h4 class="text-lg font-semibold text-success-800">Loan Application Submitted!</h4>
        </div>
        <div class="text-success-700 space-y-2">
          <p><strong>Loan Amount:</strong> $${amount.toLocaleString()}</p>
          <p><strong>Monthly Payment:</strong> $${monthlyPayment.toLocaleString()}</p>
          <p><strong>Tenure:</strong> ${months} months</p>
          <p class="text-sm mt-4">Your application is being reviewed. You'll receive a response within 24-48 hours.</p>
        </div>
      </div>
    `;
    
    const loanSection = document.querySelector('#loan-summary').parentElement;
    loanSection.innerHTML = confirmationMessage;
  }

  /**
   * Update currency displays in the credit score section
   */
  updateCurrencyDisplays() {
    const creditData = this.generateCreditData();
    const loanOptions = this.calculateLoanOptions(creditData);
    
    // Update max loan amount display
    const maxAmountElement = document.querySelector('.text-3xl.font-bold.text-primary-700');
    if (maxAmountElement) {
      maxAmountElement.textContent = currencyService.formatAmount(loanOptions.maxAmount);
    }
    
    // Update loan slider labels
    const sliderLabels = document.querySelectorAll('#loan-amount-slider + .flex span');
    if (sliderLabels.length >= 2) {
      sliderLabels[0].textContent = currencyService.formatAmount(50);
      sliderLabels[1].textContent = currencyService.formatAmount(loanOptions.maxAmount);
    }
    
    // Update loan summary if visible
    this.updateLoanSummary();
  }
}