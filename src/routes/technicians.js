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
});// src/routes/technicians.js
const express = require("express");
const pool = require("../db");

const router = express.Router();

/* -------------------------------------------------------
   GET ALL TECHNICIANS
------------------------------------------------------- */
router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM technicians ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------------------
   GET SINGLE TECHNICIAN
------------------------------------------------------- */
router.get("/:id", async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM technicians WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Technician not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------------------
   CREATE TECHNICIAN
------------------------------------------------------- */
router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await pool.query(
      `INSERT INTO technicians (name)
       VALUES ($1)
       RETURNING *`,
      [name]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------------------
   UPDATE TECHNICIAN
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
      `UPDATE technicians
       SET ${fields.join(", ")}
       WHERE id = $${index}
       RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Technician not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------------------
   DELETE TECHNICIAN
------------------------------------------------------- */
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await pool.query(
      "DELETE FROM technicians WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Technician not found" });
    }

    res.json({ message: "Technician deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;


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

