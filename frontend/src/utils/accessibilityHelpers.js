/**
 * Accessibility Helper Functions for SEED Platform
 * Provides utilities for improving accessibility and responsive design
 */

export class AccessibilityHelpers {
  /**
   * Announce message to screen readers
   * @param {string} message - Message to announce
   * @param {string} priority - 'polite' or 'assertive'
   */
  static announceToScreenReader(message, priority = 'polite') {
    const announcement = document.getElementById('sr-announcements');
    if (announcement) {
      announcement.setAttribute('aria-live', priority);
      announcement.textContent = message;
      
      // Clear after a delay to allow for re-announcements
      setTimeout(() => {
        announcement.textContent = '';
      }, 1000);
    }
  }

  /**
   * Set focus to element with proper error handling
   * @param {string|Element} element - Element selector or element
   * @param {Object} options - Focus options
   */
  static setFocus(element, options = {}) {
    try {
      const el = typeof element === 'string' ? document.querySelector(element) : element;
      if (el && typeof el.focus === 'function') {
        el.focus(options);
        return true;
      }
    } catch (error) {
      console.warn('Failed to set focus:', error);
    }
    return false;
  }

  /**
   * Create accessible button with proper ARIA attributes
   * @param {Object} config - Button configuration
   * @returns {string} - HTML string
   */
  static createAccessibleButton(config) {
    const {
      id = '',
      classes = 'btn-primary',
      text = '',
      ariaLabel = '',
      ariaDescribedBy = '',
      disabled = false,
      type = 'button',
      onClick = ''
    } = config;

    return `
      <button type="${type}"
              ${id ? `id="${id}"` : ''}
              class="${classes}"
              ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}
              ${ariaDescribedBy ? `aria-describedby="${ariaDescribedBy}"` : ''}
              ${disabled ? 'disabled' : ''}
              ${onClick ? `onclick="${onClick}"` : ''}>
        <span>${text}</span>
      </button>
    `;
  }

  /**
   * Create accessible form input with proper labels and error handling
   * @param {Object} config - Input configuration
   * @returns {string} - HTML string
   */
  static createAccessibleInput(config) {
    const {
      id,
      name = id,
      type = 'text',
      label,
      placeholder = '',
      required = false,
      value = '',
      helpText = '',
      classes = 'form-input',
      autocomplete = '',
      inputmode = '',
      pattern = ''
    } = config;

    const helpId = `${id}-help`;
    const errorId = `${id}-error`;

    return `
      <div>
        <label for="${id}" class="block text-sm font-medium text-neutral-700 mb-2">
          ${label} ${required ? '<span class="text-red-500" aria-label="required">*</span>' : ''}
        </label>
        <input type="${type}"
               id="${id}"
               name="${name}"
               class="${classes}"
               placeholder="${placeholder}"
               value="${value}"
               ${required ? 'required' : ''}
               ${autocomplete ? `autocomplete="${autocomplete}"` : ''}
               ${inputmode ? `inputmode="${inputmode}"` : ''}
               ${pattern ? `pattern="${pattern}"` : ''}
               aria-describedby="${helpText ? helpId : ''} ${errorId}"
               ${required ? 'aria-required="true"' : ''}>
        ${helpText ? `<p id="${helpId}" class="mt-2 text-sm text-neutral-500">${helpText}</p>` : ''}
        <div id="${errorId}" class="mt-1 text-sm text-red-600 hidden" role="alert" aria-live="polite"></div>
      </div>
    `;
  }

  /**
   * Create accessible card component
   * @param {Object} config - Card configuration
   * @returns {string} - HTML string
   */
  static createAccessibleCard(config) {
    const {
      id = '',
      classes = 'card',
      heading = '',
      headingLevel = 'h3',
      content = '',
      ariaLabel = '',
      role = 'article'
    } = config;

    const headingId = id ? `${id}-heading` : '';

    return `
      <${role} ${id ? `id="${id}"` : ''} 
               class="${classes}"
               ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}
               ${headingId ? `aria-labelledby="${headingId}"` : ''}>
        ${heading ? `<${headingLevel} ${headingId ? `id="${headingId}"` : ''} class="font-semibold text-neutral-800 mb-4">${heading}</${headingLevel}>` : ''}
        ${content}
      </${role}>
    `;
  }

  /**
   * Validate form field and show/hide error messages
   * @param {string} fieldId - Field ID
   * @param {string} errorMessage - Error message to display
   * @param {boolean} isValid - Whether field is valid
   */
  static validateField(fieldId, errorMessage, isValid) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(`${fieldId}-error`);
    
    if (!field || !errorDiv) return;

    if (isValid) {
      errorDiv.classList.add('hidden');
      field.setAttribute('aria-invalid', 'false');
    } else {
      errorDiv.textContent = errorMessage;
      errorDiv.classList.remove('hidden');
      field.setAttribute('aria-invalid', 'true');
      this.announceToScreenReader(`Error: ${errorMessage}`, 'assertive');
    }
  }

  /**
   * Setup keyboard navigation for a group of elements
   * @param {string} containerSelector - Container selector
   * @param {string} itemSelector - Item selector within container
   */
  static setupKeyboardNavigation(containerSelector, itemSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const items = container.querySelectorAll(itemSelector);
    let currentIndex = 0;

    // Set initial tabindex
    items.forEach((item, index) => {
      item.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });

    container.addEventListener('keydown', (e) => {
      let newIndex = currentIndex;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          newIndex = (currentIndex + 1) % items.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          newIndex = (currentIndex - 1 + items.length) % items.length;
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = items.length - 1;
          break;
        default:
          return;
      }

      // Update tabindex and focus
      items[currentIndex].setAttribute('tabindex', '-1');
      items[newIndex].setAttribute('tabindex', '0');
      items[newIndex].focus();
      currentIndex = newIndex;
    });
  }

  /**
   * Check if user prefers reduced motion
   * @returns {boolean}
   */
  static prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Check if user prefers high contrast
   * @returns {boolean}
   */
  static prefersHighContrast() {
    return window.matchMedia('(prefers-contrast: high)').matches;
  }

  /**
   * Get responsive breakpoint information
   * @returns {Object} - Breakpoint information
   */
  static getBreakpointInfo() {
    const width = window.innerWidth;
    return {
      width,
      isMobile: width < 640,
      isTablet: width >= 640 && width < 1024,
      isDesktop: width >= 1024,
      breakpoint: width < 640 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'
    };
  }

  /**
   * Setup responsive behavior for elements
   * @param {Function} callback - Callback function to execute on resize
   * @param {number} debounceMs - Debounce delay in milliseconds
   */
  static setupResponsiveBehavior(callback, debounceMs = 250) {
    let timeoutId;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback(this.getBreakpointInfo());
      }, debounceMs);
    };

    window.addEventListener('resize', handleResize);
    
    // Call immediately
    callback(this.getBreakpointInfo());
    
    // Return cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }

  /**
   * Create loading state with proper accessibility
   * @param {string} message - Loading message
   * @returns {string} - HTML string
   */
  static createLoadingState(message = 'Loading...') {
    return `
      <div class="flex items-center justify-center p-8" role="status" aria-live="polite">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mr-3" aria-hidden="true"></div>
        <span class="text-neutral-600">${message}</span>
      </div>
    `;
  }

  /**
   * Create error state with proper accessibility
   * @param {string} message - Error message
   * @param {string} actionText - Action button text
   * @param {string} actionHandler - Action button handler
   * @returns {string} - HTML string
   */
  static createErrorState(message, actionText = 'Try Again', actionHandler = '') {
    return `
      <div class="text-center p-8" role="alert" aria-live="assertive">
        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-neutral-800 mb-2">Something went wrong</h3>
        <p class="text-neutral-600 mb-4">${message}</p>
        ${actionHandler ? `<button onclick="${actionHandler}" class="btn-primary">${actionText}</button>` : ''}
      </div>
    `;
  }

  /**
   * Initialize accessibility features for the application
   */
  static initializeAccessibility() {
    // Add skip link if not present
    if (!document.querySelector('[href="#main-content"]')) {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50';
      skipLink.textContent = 'Skip to main content';
      document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Add screen reader announcements div if not present
    if (!document.getElementById('sr-announcements')) {
      const announcements = document.createElement('div');
      announcements.id = 'sr-announcements';
      announcements.setAttribute('aria-live', 'polite');
      announcements.setAttribute('aria-atomic', 'true');
      announcements.className = 'sr-only';
      document.body.appendChild(announcements);
    }

    // Setup global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Alt + M to go to main content
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          this.announceToScreenReader('Navigated to main content');
        }
      }
    });

    console.log('Accessibility features initialized');
  }
}

// Auto-initialize when DOM is loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    AccessibilityHelpers.initializeAccessibility();
  });
}