const fs = require('fs').promises;
const fs1 = require('fs');
const {v4: uuidv4} = require('uuid');
const path = require('path');
const config = require('./config');
const cp = require('child_process');
const Logger = require('logplease');
const logger =  Logger.create('Job');

let uid = 0;
let gid = 0;


const STATES = {
    READY: Symbol("The job is ready."),
    PRIMED: Symbol("Job is primed."),
    EXECUTED: Symbol("Job is executed")
}

let job_queue = [];
let remaining_job_spaces = config.max_concurrent_jobs;

// noinspection JSCheckFunctionSignatures
class Job {
    constructor({ runtime, file, stdin, args, memory_limit, timeouts, qid }) {
        this.uuid = uuidv4();
        this.runtime = runtime;
        this.qid = qid;
        this.file = file;
        file.encoding = ['utf8', 'hex', 'base64'].includes(file.encoding) || 'utf8';

        this.stdin = stdin;

        if (this.stdin.slice(-1) !== '\n') {
            this.stdin += '\n';
        }

        this.args = args;
        this.memory_limit = memory_limit;
        this.timeouts = timeouts;

        uid++;
        gid++;
        this.uid = uid;
        this.gid = gid;
        uid %= (config.runner_uid_max - config.runner_uid_min + 1);
        gid %= (config.runner_gid_max - config.runner_gid_min + 1);

        this.dir = path.join(config.data_directory, "jobs", this.uuid);
        this.state = STATES.READY;
        logger.log('prepped job');
    }


    async prime(){

        if (remaining_job_spaces < 1) {
            logger.log('awaiting job slot');
            await new Promise(resolve => {
                job_queue.push(resolve);
            });
        }

        remaining_job_spaces--;

        logger.log('Creating this.dir');

        await fs.mkdir(this.dir, {mode: 0o700});
        logger.log('Transferring owner ship');
        await fs.chown(this.dir, this.uid, this.gid);
        logger.log('Iterating through files');

        logger.log('Setting file path... ');
        const file_path = path.join(this.dir, this.file.name)
        logger.log('Reading file content...');
        const file_content = Buffer.from(this.file.content, this.file.encoding);
        logger.log('Setting test path...');
        const test_file_path = path.join(config.tests_dir, `${this.runtime.language}/${this.qid}.py`);

        const test_file_content = Buffer.from(await fs.readFile(test_file_path), 'utf8');
        const job_test_path = path.join(this.dir, `${this.qid}.py`);


        logger.log('Writing file contents... ');
        await fs.writeFile(file_path, file_content);
        await fs.writeFile(job_test_path, test_file_content);
        await fs.chown(file_path, this.uid, this.gid);
        await fs.chown(test_file_path, this.uid, this.gid);

        this.state = STATES.PRIMED;
    }

    async execute() {
        return await new Promise((resolve, reject) => {
            if (this.state !== STATES.PRIMED) {
                reject({
                    message: "Job needs to be in primed state.",
                });
            }

            let child = cp.spawn("python3", [path.join(this.dir, `${this.qid}.py`)]);
            let stdout ="", stderr="";
            child.stdout.on("data", (data) => {
                stdout += data;
            });

            child.stderr.on("data", (data) => {
                stderr += data;
            });

            child.on('close', (code, signal) => {
                let result = stdout || stderr;
                resolve(result);
            });
        });
    }


    async  cleanup_job_files() {
        try {
            // Remove the job directory recursively
            await removeDirectoryRecursive(this.dir);
            remaining_job_spaces++;

            if (job_queue.length > 0) {
                job_queue.shift()();
            }
        } catch (error) {
            // Handle the error if the directory removal fails
            console.error(`Error cleaning up job files: ${error.message}`);
        }
    }

}
async  function removeDirectoryRecursive(dirPath) {
    if (fs1.existsSync(dirPath)) {
        const files = await fs.readdir(dirPath);

        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const fileStat = await fs.stat(filePath);

            if (fileStat.isDirectory()) {
                await removeDirectoryRecursive(filePath);
            } else {
                await fs.unlink(filePath);
            }
        }

        await fs.rmdir(dirPath);
    }
}
module.exports = Job;