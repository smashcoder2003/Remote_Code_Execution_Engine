const router = require('express').Router();
const { Pool } = require('pg');
const Logger = require('logplease');
const logger = Logger.create('DataBaseAPI');
require('dotenv/config');
const  randomQidList  = require('../utils/shuffleQuestions');
const jwt = require('jsonwebtoken');

const pool = new Pool({
    user: process.env.POSTGRESQL_USER_NAME,
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.POSTGRESQL_DATABASE,
    port: process.env.POSTGRESQL_PORT,
    host: process.env.POSTGRESQL_HOST,
});

logger.log("Successfully pool connection");

router.post('/questions', async (req, res) => {
    try {
        logger.log('Formatting Assignment request');
        let assignments = req.body.assignments.map(assignment => `'${assignment}'`).join(', ');
        logger.log('Formatted Assignments request');
        const result  = await pool.query(`SELECT * FROM questions WHERE qid IN (${assignments});`);
        res.status(200).json({ assignments: result.rows });
    } catch (err) {
       console.log(err.message);
       logger.log(err.message);
       res.status(400).json({ message: err.message });
    }
});

router.get('/assignments', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) res.json({ loggedIn: false });
        const  { assignments } = jwt.decode(req.cookies.assignments, process.env.TOKEN_SECRET);
        logger.log("Decoded Assignments: ", assignments);
        res.status(200).json({ assignments });
    }   catch (err) {
            res.json({ message: err.message });
    }
});

router.get('/generate_assignments', async (req, res) => {
    const myQids = ['qid1', 'qid2', 'qid3', 'qid4', 'qid5', 'qid6', 'qid7', 'qid8', 'qid9', 'qid10'];
    const assignments = randomQidList(myQids);
    const assignmentToken = jwt.sign({ assignments }, process.env.TOKEN_SECRET, { expiresIn: 3600000 });
    res.status(200).cookie('assignments', assignmentToken, { httpOnly: true });
    res.json({ message: "Generated assignments" });
    logger.log("Generated Assignments");
});

router.post('/validate_user', async (req, res) => {
    const { user, password } = req.body;
    try {
         const result = await pool.query(`SELECT username, password FROM users WHERE username='${user}' AND password='${password}'`);
         if (!result.rows[0]['password'] === password) res.status(200).json({ authorized: false });
         res.status(200).json({ authorized: true, message: "successfully loggedIn" } );
    } catch (err) {
        console.log(err);
        res.status(400).json({ authorized: false, message: err.message });
    }
});


module.exports = router;