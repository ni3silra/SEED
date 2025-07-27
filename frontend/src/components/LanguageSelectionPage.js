/**
 * Language Selection Page Component for SEED Platform
 * Initial language selection for new users
 */

export class LanguageSelectionPage {
  constructor() {
    this.languages = this.getSupportedLanguages();
  }

  /**
   * Render the language selection page
   * @returns {string} - HTML string
   */
  render() {
    return `
      <div class="min-h-screen bg-gradient-to-br from-primary-50 to-success-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-neutral-800 mb-2">Welcome to SEED</h1>
            <p class="text-neutral-600 text-lg">Choose your preferred language to get started</p>
            <p class="text-sm text-neutral-500 mt-2">Select the language you're most comfortable with</p>
          </div>

          <!-- Language Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            ${this.languages.map(language => this.renderLanguageOption(language)).join('')}
          </div>

          <!-- Continue Button -->
          <div class="text-center">
            <button id="continue-btn" 
                    class="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled>
              Continue to Dashboard
            </button>
            <p class="text-sm text-neutral-500 mt-3">
              You can change your language anytime from the dashboard
            </p>
          </div>

          <!-- Footer -->
          <div class="mt-8 pt-6 border-t border-neutral-200 text-center">
            <p class="text-xs text-neutral-500">
              SEED Platform supports multiple languages to serve our diverse community
            </p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render individual language option
   * @param {Object} language - Language object
   * @returns {string} - HTML string
   */
  renderLanguageOption(language) {
    return `
      <div class="language-option border-2 border-neutral-200 rounded-lg p-4 cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-all"
           data-language="${language.code}">
        <div class="flex items-center">
          <div class="text-3xl mr-4">${language.flag}</div>
          <div class="flex-1">
            <h3 class="font-semibold text-neutral-800">${language.name}</h3>
            <p class="text-sm text-neutral-600">${language.nativeName}</p>
          </div>
          <div class="language-radio w-5 h-5 border-2 border-neutral-300 rounded-full flex items-center justify-center">
            <div class="w-3 h-3 bg-primary-600 rounded-full hidden"></div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Get supported languages
   * @returns {Array} - Array of language objects
   */
  getSupportedLanguages() {
    return [
      {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        flag: '🇺🇸'
      },
      {
        code: 'de',
        name: 'German',
        nativeName: 'deutche',
        flag: 'DE'
      },
      {
        code: 'es',
        name: 'Spanish',
        nativeName: 'Español',
        flag: '🇪🇸'
      },
      {
        code: 'fr',
        name: 'French',
        nativeName: 'Français',
        flag: '🇫🇷'
      },
      {
        code: 'pt',
        name: 'Portuguese',
        nativeName: 'Português',
        flag: '🇧🇷'
      },
      {
        code: 'hi',
        name: 'Hindi',
        nativeName: 'हिन्दी',
        flag: '🇮🇳'
      },
      {
        code: 'ar',
        name: 'Arabic',
        nativeName: 'العربية',
        flag: '🇸🇦'
      },
      {
        code: 'sw',
        name: 'Swahili',
        nativeName: 'Kiswahili',
        flag: '🇰🇪'
      }
    ];
  }

  /**
   * Initialize event listeners
   */
  initializeEventListeners() {
    const languageOptions = document.querySelectorAll('.language-option');
    const continueBtn = document.getElementById('continue-btn');
    let selectedLanguage = null;

    languageOptions.forEach(option => {
      option.addEventListener('click', () => {
        // Remove selection from all options
        languageOptions.forEach(opt => {
          opt.classList.remove('border-primary-500', 'bg-primary-100');
          opt.classList.add('border-neutral-200');
          const radio = opt.querySelector('.language-radio div');
          radio.classList.add('hidden');
        });

        // Add selection to clicked option
        option.classList.remove('border-neutral-200');
        option.classList.add('border-primary-500', 'bg-primary-100');
        const radio = option.querySelector('.language-radio div');
        radio.classList.remove('hidden');

        // Store selected language
        selectedLanguage = option.dataset.language;
        
        // Enable continue button
        continueBtn.disabled = false;
        continueBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      });
    });

    continueBtn.addEventListener('click', () => {
      if (selectedLanguage) {
        this.handleLanguageSelection(selectedLanguage);
      }
    });

    // Auto-select English as default
    const englishOption = document.querySelector('[data-language="en"]');
    if (englishOption) {
      englishOption.click();
    }
  }

  /**
   * Handle language selection and proceed to dashboard
   * @param {string} languageCode - Selected language code
   */
  handleLanguageSelection(languageCode) {
    // Store language preference in SessionStorage
    sessionStorage.setItem('seed_language', languageCode);
    
    // Show loading state
    const continueBtn = document.getElementById('continue-btn');
    continueBtn.textContent = 'Setting up your dashboard...';
    continueBtn.disabled = true;

    // Simulate setup delay and proceed to dashboard
    setTimeout(() => {
      // Trigger navigation to dashboard
      if (window.router) {
        window.router.navigate('dashboard');
      } else {
        // Fallback: reload page to trigger router check
        window.location.reload();
      }
    }, 1500);
  }

  /**
   * Check if user needs language selection
   * @returns {boolean} - True if language selection is needed
   */
  static needsLanguageSelection() {
    const savedLanguage = sessionStorage.getItem('seed_language');
    return !savedLanguage;
  }
}