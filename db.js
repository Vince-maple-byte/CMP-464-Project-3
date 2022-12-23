const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "root",
    database: "user_database",
    port: 5432
})

module.exports = pool;