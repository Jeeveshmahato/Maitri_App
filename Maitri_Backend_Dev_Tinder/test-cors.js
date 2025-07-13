const axios = require('axios');

async function testCORS() {
  const baseUrl = 'https://maitri-app-backend.onrender.com';
  
  console.log('Testing CORS configuration...');
  
  try {
    // Test GET request
    console.log('\n1. Testing GET request...');
    const getResponse = await axios.get(`${baseUrl}/test-cors`);
    console.log('✅ GET request successful:', getResponse.data);
    
    // Test OPTIONS request (preflight)
    console.log('\n2. Testing OPTIONS request...');
    const optionsResponse = await axios.options(`${baseUrl}/profile/edit`, {
      headers: {
        'Origin': 'https://maitri-app-frontend.onrender.com',
        'Access-Control-Request-Method': 'PATCH',
        'Access-Control-Request-Headers': 'Content-Type, Authorization'
      }
    });
    console.log('✅ OPTIONS request successful');
    console.log('Response headers:', optionsResponse.headers);
    
    console.log('\n✅ CORS configuration appears to be working correctly!');
    
  } catch (error) {
    console.error('❌ CORS test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
  }
}

testCORS(); 