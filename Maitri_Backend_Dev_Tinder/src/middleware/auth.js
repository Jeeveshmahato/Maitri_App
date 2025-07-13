const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const userAuth = async(req, res, next) => {
  try {
    console.log("[AUTH] Cookies received:", req.cookies);
    console.log("[AUTH] Token from cookies:", req.cookies.token);
    
    const token = req.cookies.token;
    if (!token) {
      console.log("[AUTH] No token found in cookies");
      return res.status(401).json({ error: "No token provided, authorization denied" });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log("[AUTH] Invalid token:", err.message);
        return res.status(401).json({ error: "Invalid token" });
      }
      console.log("[AUTH] Token verified, user ID:", decoded.id);
      
      const user = await User.findById(decoded.id);
      if (!user) {
        console.log("[AUTH] User not found in database");
        return res.status(403).json({ error: "No user found, authorization denied" });
      }
      console.log("[AUTH] User authenticated:", user.firstName);
      req.user = user;
      next();
    });
  } catch (error) {
    console.log("[AUTH] Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { userAuth };
