/**
 * Translation Service for SEED Platform
 * Handles Google Translate API integration and language management
 */

class TranslationService {
  constructor() {
    this.currentLanguage = this.getStoredLanguage();
    this.cache = new Map();
    this.isTranslating = false;
    
    // Mock Google Translate API - In production, use actual Google Translate API
    this.mockTranslations = this.initializeMockTranslations();
  }

  /**
   * Get stored language from SessionStorage
   * @returns {string} - Language code
   */
  getStoredLanguage() {
    return sessionStorage.getItem('seed_language') || 'en';
  }

  /**
   * Set current language and store in SessionStorage
   * @param {string} languageCode - Language code
   */
  setLanguage(languageCode) {
    this.currentLanguage = languageCode;
    sessionStorage.setItem('seed_language', languageCode);
  }

  /**
   * Get current language
   * @returns {string} - Current language code
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Translate text to current language
   * @param {string} text - Text to translate
   * @param {string} targetLanguage - Target language code (optional, uses current if not provided)
   * @returns {Promise<string>} - Translated text
   */
  async translateText(text, targetLanguage = null) {
    const target = targetLanguage || this.currentLanguage;
    
    // Return original text if target is English
    if (target === 'en') {
      return text;
    }

    // Check cache first
    const cacheKey = `${text}_${target}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // In production, replace this with actual Google Translate API call
      const translatedText = await this.mockTranslateText(text, target);
      
      // Cache the translation
      this.cache.set(cacheKey, translatedText);
      
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    }
  }

  /**
   * Translate entire page content
   * @param {string} targetLanguage - Target language code
   */
  async translatePage(targetLanguage = null) {
    const target = targetLanguage || this.currentLanguage;
    
    if (target === 'en' || this.isTranslating) {
      return;
    }

    this.isTranslating = true;
    
    try {
      // Find all translatable elements
      const translatableElements = document.querySelectorAll('[data-translate], h1, h2, h3, h4, h5, h6, p, span, button, label, option');
      
      for (const element of translatableElements) {
        // Skip elements that shouldn't be translated
        if (this.shouldSkipElement(element)) {
          continue;
        }

        const originalText = element.textContent.trim();
        if (originalText && originalText.length > 0) {
          try {
            const translatedText = await this.translateText(originalText, target);
            if (translatedText !== originalText) {
              element.textContent = translatedText;
            }
          } catch (error) {
            console.warn('Failed to translate element:', error);
          }
        }
      }

      // Translate placeholder texts
      const inputElements = document.querySelectorAll('input[placeholder], textarea[placeholder]');
      for (const input of inputElements) {
        const placeholder = input.getAttribute('placeholder');
        if (placeholder) {
          const translatedPlaceholder = await this.translateText(placeholder, target);
          input.setAttribute('placeholder', translatedPlaceholder);
        }
      }

    } catch (error) {
      console.error('Page translation error:', error);
    } finally {
      this.isTranslating = false;
    }
  }

  /**
   * Check if element should be skipped during translation
   * @param {Element} element - DOM element
   * @returns {boolean} - True if element should be skipped
   */
  shouldSkipElement(element) {
    // Skip if element has no-translate class or attribute
    if (element.classList.contains('no-translate') || element.hasAttribute('data-no-translate')) {
      return true;
    }

    // Skip if element is inside a no-translate container
    if (element.closest('.no-translate, [data-no-translate]')) {
      return true;
    }

    // Skip script and style elements
    if (['SCRIPT', 'STYLE', 'CODE', 'PRE'].includes(element.tagName)) {
      return true;
    }

    // Skip elements with only numbers or symbols
    const text = element.textContent.trim();
    if (/^[\d\s\$\%\+\-\(\)\.]+$/.test(text)) {
      return true;
    }

    // Skip very short text (likely not meaningful)
    if (text.length < 2) {
      return true;
    }

    return false;
  }

  /**
   * Mock translation function (replace with actual Google Translate API)
   * @param {string} text - Text to translate
   * @param {string} targetLanguage - Target language code
   * @returns {Promise<string>} - Translated text
   */
  async mockTranslateText(text, targetLanguage) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    const translations = this.mockTranslations[targetLanguage];
    if (translations && translations[text.toLowerCase()]) {
      return translations[text.toLowerCase()];
    }

    // For demonstration, add language prefix for untranslated text
    const languageNames = {
      'es': 'ES',
      'fr': 'FR', 
      'pt': 'PT',
      'hi': 'HI',
      'ar': 'AR',
      'sw': 'SW',
      'zh': 'ZH'
    };

    return `[${languageNames[targetLanguage] || targetLanguage.toUpperCase()}] ${text}`;
  }

  /**
   * Initialize mock translations for common phrases
   * @returns {Object} - Mock translation data
   */
  initializeMockTranslations() {
    return {
      'es': {
        'welcome back': 'Bienvenido de vuelta',
        'dashboard': 'Panel de control',
        'income': 'Ingresos',
        'expenses': 'Gastos',
        'savings': 'Ahorros',
        'credit score': 'Puntuación crediticia',
        'loan eligibility': 'Elegibilidad de préstamo',
        'monthly income': 'Ingresos mensuales',
        'monthly expenses': 'Gastos mensuales',
        'net savings': 'Ahorros netos',
        'financial health': 'Salud financiera',
        'community success stories': 'Historias de éxito de la comunidad',
        'load more stories': 'Cargar más historias',
        'logout': 'Cerrar sesión'
      },
      'fr': {
        'welcome back': 'Bon retour',
        'dashboard': 'Tableau de bord',
        'income': 'Revenus',
        'expenses': 'Dépenses',
        'savings': 'Économies',
        'credit score': 'Score de crédit',
        'loan eligibility': 'Admissibilité au prêt',
        'monthly income': 'Revenus mensuels',
        'monthly expenses': 'Dépenses mensuelles',
        'net savings': 'Économies nettes',
        'financial health': 'Santé financière',
        'community success stories': 'Histoires de succès communautaires',
        'load more stories': 'Charger plus d\'histoires',
        'logout': 'Se déconnecter'
      },
      'pt': {
        'welcome back': 'Bem-vindo de volta',
        'dashboard': 'Painel',
        'income': 'Renda',
        'expenses': 'Despesas',
        'savings': 'Poupanças',
        'credit score': 'Pontuação de crédito',
        'loan eligibility': 'Elegibilidade para empréstimo',
        'monthly income': 'Renda mensal',
        'monthly expenses': 'Despesas mensais',
        'net savings': 'Poupanças líquidas',
        'financial health': 'Saúde financeira',
        'community success stories': 'Histórias de sucesso da comunidade',
        'load more stories': 'Carregar mais histórias',
        'logout': 'Sair'
      },
      'hi': {
        'welcome back': 'वापसी पर स्वागत',
        'dashboard': 'डैशबोर्ड',
        'income': 'आय',
        'expenses': 'खर्च',
        'savings': 'बचत',
        'credit score': 'क्रेडिट स्कोर',
        'loan eligibility': 'ऋण पात्रता',
        'monthly income': 'मासिक आय',
        'monthly expenses': 'मासिक खर्च',
        'net savings': 'शुद्ध बचत',
        'financial health': 'वित्तीय स्वास्थ्य',
        'community success stories': 'समुदायिक सफलता की कहानियां',
        'load more stories': 'और कहानियां लोड करें',
        'logout': 'लॉग आउट'
      },
      "de": {
        "welcome back": "Willkommen zurück",
        "dashboard": "Dashboard",
        "income": "Einkommen",
        "expenses": "Ausgaben",
        "savings": "Ersparnisse",
        "credit score": "Kreditwürdigkeit",
        "loan eligibility": "Kreditberechtigung",
        "monthly income": "Monatliches Einkommen",
        "monthly expenses": "Monatliche Ausgaben",
        "net savings": "Netto-Ersparnisse",
        "financial health": "Finanzielle Gesundheit",
        "community success stories": "Erfolgsgeschichten der Gemeinschaft",
        "load more stories": "Mehr Geschichten laden",
        "logout": "Abmelden"
      }    
    };
  }

  /**
   * Get supported languages
   * @returns {Array} - Array of supported language objects
   */
  getSupportedLanguages() {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'es', name: 'Spanish', nativeName: 'Español' },
      { code: 'fr', name: 'French', nativeName: 'Français' },
      { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
      { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
      { code: 'zh', name: 'Chinese', nativeName: '中文' }
    ];
  }

  /**
   * Clear translation cache
   */
  clearCache() {
    this.cache.clear();
  }
}

export default new TranslationService();