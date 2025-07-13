// export const BaseUrl = "http://localhost:5000"

// Update this URL with your actual backend URL from Render
const BACKEND_URL = "https://maitri-app-backend.onrender.com";

export const BaseUrl =
  location.hostname === "localhost" 
    ? "http://localhost:5000" 
    : BACKEND_URL;
// export const BaseUrl = "/api"
