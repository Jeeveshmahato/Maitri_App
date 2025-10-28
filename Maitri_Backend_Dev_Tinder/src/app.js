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

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.NODE_ENV === "production" 
      ? ["https://maitri-app-frontend.onrender.com", "http://localhost:5173"]
      : ["http://localhost:5173"];
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, allowedOrigins[0]);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, origin); // Return the origin string, not true
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Cookie"],
  exposedHeaders: ["Set-Cookie"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  maxAge: 86400 // Cache preflight response for 24 hours
};

// Explicitly handle OPTIONS requests for CORS preflight
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  const allowedOrigins = process.env.NODE_ENV === "production" 
    ? ["https://maitri-app-frontend.onrender.com", "http://localhost:5173"]
    : ["http://localhost:5173"];
  
  if (!origin || allowedOrigins.indexOf(origin) !== -1) {
    res.setHeader('Access-Control-Allow-Origin', origin || allowedOrigins[0]);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Cookie');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '86400');
  }
  res.sendStatus(204);
});

// Apply CORS middleware
app.use(cors(corsOptions));

// Parse request bodies after CORS
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
