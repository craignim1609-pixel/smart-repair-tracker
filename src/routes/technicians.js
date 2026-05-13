// src/routes/technicians.js
const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET /api/technicians
router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM technicians ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// POST /api/technicians
router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      "INSERT INTO technicians (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

