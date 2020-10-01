const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

// ROUTES

// create job
app.post('/jobs', async (req, res) => {
    try {
        const { title, company, link, reply, notes, city } = req.body;
        const newJob = await pool.query(
            "INSERT INTO jobs (title, company, link, reply, notes, city) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [title, company, link, reply, notes, city]
        )
        res.json(newJob.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

// get all jobs
app.get("/jobs", async(req, res) => {
    try {
        const allJobs = await pool.query("SELECT * FROM jobs");
        res.json(allJobs.rows)
    } catch (err) {
        console.log(err.message);
    }
})

// get specific job
app.get("/jobs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const job = await pool.query("SELECT * FROM jobs WHERE job_id = $1", [id]);
        res.json(job.rows[0])
    } catch (err) {
        console.log(err.message);
    }
})

// update job
app.put("/jobs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, company, link, applied, applied_at, reply, notes, city } = req.body;
        const updateJob = await pool.query("UPDATE jobs SET title = $1, company = $2, link = $3, applied = $4, applied_at = $5, reply = $6, notes = $7, city = $8 WHERE job_id = $9",
        [title, company, link, applied, applied_at, reply, notes, city, id]
        );
        res.json("job was updated");
    } catch (err) {
        console.error(err.message);
    }
});

// delete job

app.delete("/jobs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteJob = await pool.query("DELETE FROM jobs WHERE job_id = $1", [id]);
        res.json("Job was deleted");
    } catch (err) {
        console.error(err.message);
    }
})

// start the server
app.listen(5000, () => {
    console.log("Server has started on port 5000")
})

