const express = require('express');
const router = express.Router();
const path = require('path');
const Job = require('./Job');
const Logger = require('logplease');
const logger = Logger.create('Router');
const Job2 = require('./Job2');


router.use((req, res, next) => {
    if (!['GET', 'OPTIONS', 'POST'].includes(req.method)) {
        res.status(400).send({
            message: "Request method should be of type GET or OPTIONS",
        })
    }
    return next();
});

router.get('/codeeditor',(req, res) =>{
    res.status(200).sendFile(path.join(__dirname, 'public', 'codeground.html'))
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