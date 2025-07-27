import './style.css'
import router from './services/router.js'

// Make router available globally
window.router = router;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  router.init();
});

// Initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  // DOM is still loading, wait for DOMContentLoaded
} else {
  // DOM is already loaded
  router.init();
}
