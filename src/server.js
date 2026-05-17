// src/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const jobsRouter = require("./routes/jobs");
const customersRouter = require("./routes/customers");
const techniciansRouter = require("./routes/technicians");

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

// =========================
// UI ROUTES (ONLY HOME)
// =========================
app.get("/home", (req, res) => {
  res.render("home/index");
});

// =========================
// ROUTERS (UI + API)
// =========================
app.use("/jobs", jobsRouter);
app.use("/customers", customersRouter);
app.use("/technicians", techniciansRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Smart Repair Tracker API running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
