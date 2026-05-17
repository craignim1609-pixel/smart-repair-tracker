const pool = require("../db");

exports.getAllJobs = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                jobs.id,
                jobs.job_number,
                jobs.description,
                jobs.status,
                jobs.date_booked,
                customers.name AS customer_name
            FROM jobs
            LEFT JOIN customers ON jobs.customer_id = customers.id
            ORDER BY jobs.date_booked DESC;
        `);

        res.render("jobs/index", { jobs: result.rows });
    } catch (err) {
        console.error("Error fetching jobs:", err);
        res.status(500).send("Server error");
    }
};

