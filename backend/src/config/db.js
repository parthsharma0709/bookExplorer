
const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
}

module.exports = { connectDB, mongoose };
