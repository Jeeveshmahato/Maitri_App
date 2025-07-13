process.env.PORT = 5000;
process.env.JWT_SECRET = 'your_jwt_secret_here';
process.env.MONGODB_URI = 'your_mongodb_connection_string_here';

require('./src/app.js'); 