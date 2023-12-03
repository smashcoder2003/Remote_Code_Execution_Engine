const express = require('express');
const router = express.Router();
const path = require('path');
const Job = require('./Job');
const Logger = require('logplease');
const logger = Logger.create('Router');
const Job2 = require('./Job2');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();

router.use((req, res, next) => {
    if (!['GET', 'OPTIONS', 'POST'].includes(req.method)) {
        res.status(400).send({
            message: "Request method should be of type GET or OPTIONS",
        })
    }
    return next();
});

router.get('/logged_in', async (req, res) => {
    try {
        const token = req.cookies.token;
        logger.log('Extracted Cookie');

        if (!token) {
            res.status(200).json({loggedIn: false});
            return;
        }
        const { user } = jwt.verify(token, process.env.TOKEN_SECRET);
        logger.log("verified Cookie");
        const newToken = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: 3600000 });
        logger.log("Generated NewCookie");
        res.cookie('token', newToken, { maxAge: 3600000, httpOnly: true });
        logger.log("Sent NewCookie");
        // request should send the userDetails as it's body
        res.status(200).json({ signedIn: true, user: user.userName });
        logger.log("Sent login Response");
    } catch (err) {
        console.log(err);
        res.status(200).json({ signedIn: false, message: err.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;

        const result = await axios.post('http://localhost:2000/database/validate_user', {
            user: userName,
            password: password
        }, { headers: { 'Content-Type': 'Application/json' } });


        console.log(result);
        logger.log(result);
        if (result.data["authorized"] !== true) res.status(400).json({ message: "Invalid RollNo or Password" } );


        const user  = { userName: userName };
        logger.log(`USER: ${user}`);


        logger.log(`THIS IS THE TOKEN SECRET FOR TESTING: ${process.env.TOKEN_SECRET}`);
        logger.log("Creating a token for the user");
        const newToken = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: 36000});
        logger.log("Created a token for the user");


        res.cookie('token', newToken, { maxAge: 36000, httpOnly: true });
        logger.log("sent Cookies");
        res.status(200).json({ message: "You have been signed in!! ", loggedIn: true, user:  userName });
        logger.log("sent response");

    } catch (err) {
        console.log(err);
        res.status(200).json({ loggedIn: false, message: err.message });
    }
});


router.get('/codeeditor',(req, res) =>{
    res.status(200).sendFile(path.join(__dirname, 'public', 'build/index.html'))
});


router.get('/', (req, res) => {
    res.status(200).send({
        response: 'Response ok'
    });
});


router.get('/runtimes', (req, res) => {
    res.status(200).send({
        language: "python",
        version: "3.10.0",
        aliases: [
            "py",
            "python3"
        ]
    })
});


function get_job(body, type) {
    let {
        language,
        version,
        file,
        args,
        stdin,
        run_timeout,
        compile_timeout,
        run_memory_limit,
        compile_memory_limit,
        qid,
    } = body;

    return new Promise((resolve, reject) => {
        if (!qid) {
            reject({
                message: "qid is required as a string",
            });
        }

        if (!language) {
            reject({
                message: "language is required as a string",
            });
        }

        if (!version) {
            reject( {
                message: "language is required as a string",
            });
        }



        let runtime = {
            language,
            version,
        }

        let memory_limit = {
            run_memory_limit,
            compile_memory_limit
        }

        let timeouts =  {
            run_timeout,
            compile_timeout
        }

        if (type === 1) {
            resolve(
                new Job({
                    runtime,
                    file,
                    stdin,
                    args,
                    memory_limit,
                    timeouts,
                    qid,
                })
            );
        } else {
            resolve(
                new Job2({
                    runtime,
                    file,
                    stdin,
                    args,
                    memory_limit,
                    timeouts,
                    qid,
                })
            );
        }
    });
}



router.post('/execute', async (req, res) => {
    try {
    const Job = await get_job(req.body, 1);
    logger.log(`Priming job ${Job.uuid}`);

    await Job.prime();
    logger.log(`Primed job ${Job.uuid}`);

    logger.log(`Executing job ${Job.uuid}`);
    const result = await Job.execute();
    logger.log(`Executed job ${Job.uuid}`);

    logger.log(`Cleaning up Job ${Job.uuid} Files`);
    await Job.cleanup_job_files();
    logger.log(`Finished cleaning Job ${Job.uuid}`);

    res.status(200).send(result);
    }

    catch(error) {
        res.status(201).send(error);
    }

})

router.post('/run', async (req, res) => {
    try {
        const Job = await get_job(req.body, 2);
        logger.log(`Priming job ${Job.uuid}`);

        await Job.prime();
        logger.log(`Primed job ${Job.uuid}`);

        logger.log(`Executing job ${Job.uuid}`);
        const result = await Job.execute();
        logger.log(`Executed job ${Job.uuid}`);

        logger.log(`Cleaning up Job ${Job.uuid} Files`);
        await Job.cleanup_job_files();
        logger.log(`Finished cleaning Job ${Job.uuid}`);

        res.status(200).send(result);
    }

    catch(error) {
        res.status(201).send(error);
    }

});

module.exports = router;