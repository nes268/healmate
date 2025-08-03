// Database configuration
const path = require('path');

const config = {
  // Database file path
  dbPath: path.join(__dirname, 'healmate.db'),
  
  // Database options
  options: {
    verbose: console.log, // Enable SQL logging in development
    fileMustExist: false  // Create database if it doesn't exist
  },
  
  // Sample data configuration
  sampleData: {
    enabled: true,
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      phone: '+1234567890',
      dateOfBirth: '1990-05-15',
      bloodGroup: 'O+',
      emergencyContact: {
        name: 'Jane Doe',
        phone: '+1234567891',
        relationship: 'Spouse'
      }
    }
  }
};

module.exports = config; 