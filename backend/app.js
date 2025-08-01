const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const booksRoutes = require("./routes/books");
const userRoutes = require("./routes/user");

dotenv.config(); // Load environment variables from .env

const app = express();

// MongoDB Atlas Connection using environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB Atlas!");
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
});

// Middleware to parse data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static images
app.use("/images", express.static(path.join(__dirname, "images")));

// CORS configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// API Routes
app.use("/api/books", booksRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
