require("dotenv").config();
require("./config/environment"); // Load environment defaults for local development

const express = require("express");
var cookieParser = require("cookie-parser");
const app = express();
const connectDB = require("./config/database");
const authRouter = require("./Routes/auth");
const profileRouter = require("./Routes/profile");
const connectionRouter = require("./Routes/request");
const userRequest = require("./Routes/userRequest");
const paymentRouter = require("./Routes/payment");
const http = require("http");
const cors = require("cors");
const initailizeSocket = require("./utiles/Socket");
const chatRouter = require("./Routes/chat");
// CORS configuration with debugging
const corsOptions = {
  origin: process.env.NODE_ENV === "production" 
    ? ["https://maitri-app-frontend.onrender.com", "http://localhost:5173"]
    : "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Cookie"],
  exposedHeaders: ["Set-Cookie"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 86400 // Cache preflight response for 24 hours
};

app.use(cors(corsOptions));

// Global OPTIONS handler for preflight requests
app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.NODE_ENV === "production" 
    ? "https://maitri-app-frontend.onrender.com" 
    : "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Cookie");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "86400");
  res.status(204).end();
});

// Debug middleware for CORS
app.use((req, res, next) => {
  console.log(`[CORS] NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`[CORS] ${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  if (req.method === 'OPTIONS') {
    console.log('[CORS] Preflight request detected');
    console.log('[CORS] Request headers:', req.headers);
  }
  next();
});
// Apply CORS before any route handlers
app.use(express.json());
app.use(cookieParser());

// Test route to verify CORS
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working", timestamp: new Date().toISOString() });
});

// Apply routes after CORS middleware
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRouter);
app.use("/", userRequest);
app.use("/", paymentRouter);
app.use("/", chatRouter);
require("./utiles/cornJob");
const server = http.createServer(app);
initailizeSocket(server);
connectDB()
  .then(() => {
    console.log("MongoDB Connected...");
    server.listen(parseInt(process.env.PORT), () => {
      console.log(`Server running on port ${parseInt(process.env.PORT)}...`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });
