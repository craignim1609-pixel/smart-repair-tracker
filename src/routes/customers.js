// src/routes/customers.js
const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET /api/customers
router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM customers ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// POST /api/customers
router.post("/", async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;
    const result = await pool.query(
      "INSERT INTO customers (name, phone, email) VALUES ($1, $2, $3) RETURNING *",
      [name, phone, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

