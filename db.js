const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "helloworld",
    host: "localhost",
    database: "pernjobs"
});

module.exports = pool;