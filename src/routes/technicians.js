// src/routes/technicians.js
const express = require("express");
const pool = require("../db");

const router = express.Router();

/* -------------------------------------------------------
   RENDER: ADD TECHNICIAN FORM (HTML)
------------------------------------------------------- */
router.get("/new", (req, res) => {
  res.render("technicians/new");
});

/* -------------------------------------------------------
   RENDER: TECHNICIANS LIST (HTML)
------------------------------------------------------- */
router.get("/", async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM technicians ORDER BY id ASC"
    );
    res.render("technicians/index", { technicians: result.rows });
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------------------
   API: GET ALL TECHNICIANS (JSON)
------------------------------------------------------- */
router.get("/api/list", async (req, res, next) => {
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
   API: GET SINGLE TECHNICIAN (JSON)
------------------------------------------------------- */
router.get("/api/:id", async (req, res, next) => {
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
   API: CREATE TECHNICIAN
------------------------------------------------------- */
router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;

    await pool.query(
      `INSERT INTO technicians (name)
       VALUES ($1)`,
      [name]
    );

    res.redirect("/technicians");
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------------------
   API: UPDATE TECHNICIAN
------------------------------------------------------- */
router.patch("/api/:id", async (req, res, next) => {
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
   API: DELETE TECHNICIAN
------------------------------------------------------- */
router.delete("/api/:id", async (req, res, next) => {
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
