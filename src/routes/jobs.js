// src/routes/jobs.js
const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET /api/jobs
router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT j.*, c.name AS customer_name, t.name AS main_technician
       FROM jobs j
       LEFT JOIN customers c ON j.customer_id = c.id
       LEFT JOIN job_technicians jt ON jt.job_id = j.id
       LEFT JOIN technicians t ON jt.technician_id = t.id
       ORDER BY j.id DESC`
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// POST /api/jobs
router.post("/", async (req, res, next) => {
  try {
    const {
      job_number,
      customer_id,
      item_type,
      brand,
      model,
      serial_number,
      fault_reported,
      status,
      is_customer_job
    } = req.body;

    const result = await pool.query(
      `INSERT INTO jobs
       (job_number, customer_id, item_type, brand, model, serial_number,
        fault_reported, status, is_customer_job)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        job_number,
        customer_id || null,
        item_type,
        brand || null,
        model || null,
        serial_number || null,
        fault_reported,
        status || "booked_in",
        is_customer_job ?? true
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

