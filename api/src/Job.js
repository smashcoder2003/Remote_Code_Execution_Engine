const fs = require('fs').promises;
const fs1 = require('fs');
const {v4: uuidv4} = require('uuid');
const path = require('path');
const config = require('./config');
const cp = require('child_process');
const Logger = require('logplease');
const logger =  Logger.create('Job');
const properties = require('./properties');
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


    async  prime(){

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
        const test_file_path = path.join(config.tests_dir, `${this.runtime.language}/${this.qid}.${properties[this.runtime.language].normal_extension}`);

        const test_file_content = Buffer.from(await fs.readFile(test_file_path), 'utf8');
        const job_test_path = path.join(this.dir, `${this.qid}.${properties[this.runtime.language].normal_extension}`);
        logger.log('Writing file contents... ');
        await fs.writeFile(file_path, file_content);
        await fs.writeFile(job_test_path, test_file_content);
        await fs.chown(file_path, this.uid, this.gid);
        await fs.chown(test_file_path, this.uid, this.gid);

        this.state = STATES.PRIMED;
    }

    async execute() {
        return await new Promise(async (resolve) => {
            let prlimit = [
                'prlimit',
                '--nproc=' + config.max_process_count,
                '--nofile=' + config.max_open_files,
                '--fsize=' + config.max_file_size
            ]

            let timeout = [
                'timeout',
                '-s',
                '9',
                Math.ceil(config.run_timeout / 1000),
            ]

            if (config.memory_limit > 0) {
                prlimit.push('--as=' + config.memory_limit)
            }

            let stdout = "", stderr = "", compiled_error = false;
            let extension = properties[this.runtime.language].compiled ? properties[this.runtime.language].compiled_extension : properties[this.runtime.language].normal_extension

            let proc_args = [
                'nice',
                ...timeout,
                ...prlimit,
                'bash',
                path.join('/engine_api/my_engine_data/packages', this.runtime.language, 'run'),
                `${this.qid}.${properties[this.runtime.language]}.${extension}`,
                ...this.args,
            ]
3
            if (properties[this.runtime.language].compiled) {
                logger.log("Compiling Files");
                await new Promise((resolve) => {
                    let proc_comp = [
                        'nice',
                        ...timeout,
                        ...prlimit,
                        'bash',
                        path.join('/engine_api/my_engine_data/packages', this.runtime.language, 'compile'),
                        `${this.qid}.${properties[this.runtime.language].normal_extension}`,
                        `${this.file.name}`,
                    ]

                    let compilation_process = cp.spawn(proc_comp[0], proc_comp.splice(1), {
                        cwd: this.dir,
                        uid: this.uid,
                        gid: this.gid,
                        stdio: 'pipe',
                        detached: true,
                    });

                    compilation_process.stderr.on('data', (data) => {
                        compiled_error = true;
                        stderr += data;
                    });

                    compilation_process.on('close', (close) => {
                            resolve();
                    });
                });

            }

            if (!compiled_error) {

                if (properties[this.runtime.language].compiled) {
                    logger.log("Compiled files");
                }

                let proc = cp.spawn(proc_args[0], proc_args.splice(1), {
                    cwd: this.dir,
                    uid: this.uid,
                    gid: this.gid,
                    stdio: 'pipe',
                    detached: true,
                });

                proc.stdin.on('data', (data) => {
                    proc.stdin.write(this.stdin);
                    proc.stdin.end();
                    proc.stdin.destroy();
                });

                proc.stderr.on('data', (data) => {
                    stderr += data;
                });

                proc.stdout.on('data', (data) => {
                    stdout += data;
                });

                proc.on('close', (code, signal) => {
                    resolve({
                        stdout: stdout,
                        stderr: stderr,
                        code: code,
                        signal: signal,
                    });
                });

            } else {
                resolve({
                    stdout: stdout,
                    stderr: stderr
                });
            }
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