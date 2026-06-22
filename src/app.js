const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CodeVector Backend API is running 🚀",
  });
});

// Product Routes
app.use("/api/products", productRoutes);

module.exports = app;