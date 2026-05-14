// src/routes/customers.js
const express = require("express");
const pool = require("../db");

const router = express.Router();

/* -------------------------------------------------------
   GET ALL CUSTOMERS
------------------------------------------------------- */
router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------------------
   GET SINGLE CUSTOMER
------------------------------------------------------- */
router.get("/:id", async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------------------
   CREATE CUSTOMER
------------------------------------------------------- */
router.post("/", async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;

    const result = await pool.query(
      `INSERT INTO customers (name, phone, email)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, phone, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------------------
   UPDATE CUSTOMER
------------------------------------------------------- */
router.patch("/:id", async (req, res, next) => {
  try {
    const fields = [];
    const values = [];
    let index = 1;

    for (const key in req.body) {
      fields.push(`${key} = $${index}`);
      values.push(req.body[key]);
      index++;
    }

    values.push(req.params.id);

    const result = await pool.query(
      `UPDATE customers
       SET ${fields.join(", ")}
       WHERE id = $${index}
       RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------------------
  POST CUSTOMER
------------------------------------------------------- */
router.post("/", async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;

    // 1. Check if customer already exists by phone
    const existing = await pool.query(
      "SELECT * FROM customers WHERE phone = $1",
      [phone]
    );

    if (existing.rows.length > 0) {
      return res.status(200).json({
        customer: existing.rows[0],
        message: "Customer already exists"
      });
    }

    // 2. Insert new customer
    const result = await pool.query(
      "INSERT INTO customers (name, phone, email) VALUES ($1, $2, $3) RETURNING *",
      [name, phone, email]
    );

    res.status(201).json({
      customer: result.rows[0],
      message: "Customer created"
    });

  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------------------
   DELETE CUSTOMER
------------------------------------------------------- */
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await pool.query(
      "DELETE FROM customers WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json({ message: "Customer deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
