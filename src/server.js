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
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// =========================
// UI ROUTES (Pages)
// =========================

// Jobs UI
app.get("/jobs", (req, res) => {
  res.render("jobs/index");
});

app.get("/jobs/new", (req, res) => {
  res.render("jobs/new");
});

// Customers UI
app.get("/customers", (req, res) => {
  res.render("customers/index");
});

app.get("/customers/new", (req, res) => {
  res.render("customers/new");
});

// Technicians UI
app.get("/technicians", (req, res) => {
  res.render("technicians/index");
});

app.get("/technicians/new", (req, res) => {
  res.render("technicians/new");
});

// =========================
// API ROUTES
// =========================

app.use("/api/jobs", jobsRouter);
app.use("/api/customers", customersRouter);
app.use("/api/technicians", techniciansRouter);

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
