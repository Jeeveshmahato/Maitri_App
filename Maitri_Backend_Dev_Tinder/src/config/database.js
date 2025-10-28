const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Environment variables:");
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("PORT:", process.env.PORT);
    console.log(
      "DB_CONNECTION_SECRET exists:",
      !!process.env.DB_CONNECTION_SECRET
    );
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

    if (!process.env.DB_CONNECTION_SECRET) {
      throw new Error("DB_CONNECTION_SECRET environment variable is not set");
    }

    await mongoose.connect(process.env.DB_CONNECTION_SECRET);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
