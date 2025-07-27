/**
 * Simple test script to verify dashboard functionality
 */

// Test the InvesteeDashboard component
import { InvesteeDashboard } from './src/components/InvesteeDashboard.js';

// Mock user data
const mockUser = {
  id: 'test_user_123',
  phoneNumber: '+1234567890',
  role: 'investee',
  isAuthenticated: true,
  profile: {
    name: 'Test User',
    profession: 'Farmer',
    location: 'Test City'
  }
};

// Test dashboard creation
console.log('Testing InvesteeDashboard component...');

try {
  const dashboard = new InvesteeDashboard(mockUser);
  console.log('✅ Dashboard component created successfully');
  
  // Test render method
  const html = dashboard.render();
  console.log('✅ Dashboard render method works');
  console.log(`📊 Generated HTML length: ${html.length} characters`);
  
  // Test mock data generation
  console.log('📈 Mock financial data:', dashboard.mockData);
  
  // Test health score calculation
  const healthScore = dashboard.calculateFinancialHealthScore();
  console.log(`💚 Financial health score: ${healthScore}%`);
  
  console.log('🎉 All dashboard tests passed!');
  
} catch (error) {
  console.error('❌ Dashboard test failed:', error);
}