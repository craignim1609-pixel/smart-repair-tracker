
// src/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const jobsRouter = require("./routes/jobs");
const customersRouter = require("./routes/customers");
const techniciansRouter = require("./routes/technicians");

const app = express();
const PORT = process.env.PORT || 3000;

const customersRouter = require("./routes/customers");
app.use("/api/customers", customersRouter);

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Smart Repair Tracker API running" });
});

// API routes
app.use("/api/jobs", jobsRouter);
app.use("/api/customers", customersRouter);
app.use("/api/technicians", techniciansRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
