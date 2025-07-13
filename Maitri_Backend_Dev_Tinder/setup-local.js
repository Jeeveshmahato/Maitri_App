const fs = require('fs');
const path = require('path');

const envContent = `# Local Development Environment Variables
NODE_ENV=development
PORT=5000

# MongoDB Connection
# Choose one of the following options:

# Option 1: Local MongoDB (if you have MongoDB installed locally)
MONGODB_URI=mongodb://localhost:27017/maitri_app

# Option 2: MongoDB Atlas (recommended for easier setup)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/maitri_app

# JWT Secret for authentication
JWT_SECRET=dev_jwt_secret_change_this_in_production

# Optional: AWS SES for email (leave empty if not using email features)
AWS_ACCESS_KEY=
AWS_SECRET_KEY=

# Optional: Razorpay for payments (leave empty if not using payment features)
ROZAR_SECRET_ID=
ROZAR_SECRET_KEY=
RAZORPAY_WEBHOOK_SECRET=
`;

const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
} else {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file for local development');
  console.log('📝 Please edit the .env file with your actual values:');
  console.log('   - If using MongoDB Atlas, update MONGODB_URI with your connection string');
  console.log('   - Update JWT_SECRET with a secure secret');
  console.log('   - Add AWS credentials if using email features');
  console.log('   - Add Razorpay credentials if using payment features');
}

console.log('\n🚀 To start the backend:');
console.log('   npm run dev');
console.log('\n🚀 To start the frontend (in another terminal):');
console.log('   cd ../Maitri_Frontend_Dev_Tinder');
console.log('   npm run dev'); 