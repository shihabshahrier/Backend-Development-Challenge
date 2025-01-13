require("dotenv").config();
const express = require("express");
const { connect } = require("mongoose");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Database connection
connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((error) => console.error("Database connection error:", error));
