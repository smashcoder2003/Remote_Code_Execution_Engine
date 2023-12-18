const { Pool }  = require('pg');
require('dotenv/config');

const pool = new Pool({
    user: process.env.POSTGRESQl_USER_NAME,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
    port: process.env.POSTGRESQL_PORT,
    host: process.env.POSTGRESQL_HOST,
});

(async() => {
    const result  = await pool.query(`SELECT * from questions`);
    console.log(result);
    await pool.close
})();