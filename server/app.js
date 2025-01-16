const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5005;

// console.log JWT_SECRET para ver si cargó bien
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Models
const Cohort = require("./models/Cohort");
const Student = require("./models/Student");

// Authentication Routes
const authRoutes = require("./routes/auth.routes");

// User Routes (for protected routes)
const userRoutes = require("./routes/user.routes");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS OPTIONS - Configure CORS for specific origins, methods, and headers
const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization,Custom-Header",
};
app.use(cors(corsOptions));

// Mongoose Connection to MongoDB
// MongoDB URI for your MongoDB Atlas Cluster (JOSHUA's :) )
const MONGO_URI =
  "mongodb+srv://joshua:znMH6MIKIDwZOLMx@cluster0.8l6cx.mongodb.net/";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// ROUTES - https://expressjs.com/en/starter/basic-routing.html

// COHORT ROUTES

app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cohorts" });
  }
});

const cohortRoutes = require("./routes/cohortRoutes");
app.use("/api/cohort", cohortRoutes);

// STUDENT ROUTES
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

// AUTH ROUTES (authentication routes)
app.use("/auth", authRoutes);

// USER ROUTES (protected route for specific user)
app.use("/api/users", userRoutes);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
