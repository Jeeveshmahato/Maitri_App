// Environment configuration for local development
const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  
  // MongoDB - Use local MongoDB for development
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/maitri_app',
  
  // JWT Secret - Use a default for development (change in production)
  JWT_SECRET: process.env.JWT_SECRET || 'dev_jwt_secret_change_in_production',
  
  // AWS SES (optional for local development)
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || '',
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || '',
  
  // Razorpay (optional for local development)
  ROZAR_SECRET_ID: process.env.ROZAR_SECRET_ID || '',
  ROZAR_SECRET_KEY: process.env.ROZAR_SECRET_KEY || '',
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET || '',
};

// Set environment variables if they're not already set
Object.keys(config).forEach(key => {
  if (!process.env[key]) {
    process.env[key] = config[key];
  }
});

module.exports = config; 