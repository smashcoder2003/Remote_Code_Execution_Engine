const fs = require('fs');
const Logger = require('logplease');
const logger = Logger.create('Config');


const options = {
    output_dir: {
      desc: 'Where the output.txt is stored for each language',
      default: './my_engine_data/Outputs',
      validators: [x => fs.existsSync(x) || "output_dir doesn't exist"],
    },

    tests_dir: {
        desc: 'Tests for questions',
        default: './my_engine_data/Tests',
        validators: [x => fs.existsSync(x) || "tests_dir doesn't exist"],
    },
    
    bind_address: {
        desc: 'Address to bind REST API on',
        default: `0.0.0.0:${process.env['PORT'] || 2000}`,
        validators: [],
    },
    data_directory: {
        desc: 'Absolute path to store all piston related data at',
        default: './my_engine_data',
        validators: [
            x => fs.existsSync(x) || `Directory ${x} does not exist`,
        ],
    },
    runner_uid_min: {
        desc: 'Minimum uid to use for runner',
        default: 1001,
        parser: parseInt,
        validators: [(x, raw) => !isNaN(x) || `${raw} is not a number`],
    },
    runner_uid_max: {
        desc: 'Maximum uid to use for runner',
        default: 2000,
        parser: parseInt,
        validators: [(x, raw) => !isNaN(x) || `${raw} is not a number`],
    },
    runner_gid_min: {
        desc: 'Minimum gid to use for runner',
        default: 1001,
        parser: parseInt,
        validators: [(x, raw) => !isNaN(x) || `${raw} is not a number`],
    },
    runner_gid_max: {
        desc: 'Maximum gid to use for runner',
        default: 2000,
        parser: parseInt,
        validators: [(x, raw) => !isNaN(x) || `${raw} is not a number`],
    },
    disable_networking: {
        desc: 'Set to true to disable networking',
        default: true,
        parser: x => x === 'true',
        validators: [x => typeof x === 'boolean' || `${x} is not a boolean`],
    },
    output_max_size: {
        desc: 'Max size of each stdio buffer',
        default: 1024,
        parser: parseInt,
        validators: [(x, raw) => !isNaN(x) || `${raw} is not a number`],
    },
    max_process_count: {
        desc: 'Max number of processes per job',
        default: 64,
        parser: parseInt,
        validators: [(x, raw) => !isNaN(x) || `${raw} is not a number`],
    },
    max_open_files: {
        desc: 'Max number of open files per job',
        default: 2048,
        parser: parseInt,
        validators: [(x, raw) => !isNaN(x) || `${raw} is not a number`],
    },
    max_file_size: {
        desc: 'Max file size in bytes for a file',
        default: 10000000, //10MB
        parser: parseInt,
        validators: [(x, raw) => !isNaN(x) || `${raw} is not a number`],
    },
    compile_timeout: {
        desc: 'Max time allowed for compile stage in milliseconds',
        default: 10000, // 10 seconds
        parser: parseInt,
        validators: [(x, raw) => !isNaN(x) || `${raw} is not a number`],
    },
    run_timeout: {
        desc: 'Max time allowed for run stage in milliseconds',
        default: 3000, // 3 seconds
        parser: parseInt,
        validators: [(x, raw) => !isNaN(x) || `${raw} is not a number`],
    },
    compile_memory_limit: {
        desc: 'Max memory usage for compile stage in bytes (set to -1 for no limit)',
        default: -1, // no limit
        parser: parseInt,
        validators: [(x, raw) => !isNaN(x) || `${raw} is not a number`],
    },
    run_memory_limit: {
        desc: 'Max memory usage for run stage in bytes (set to -1 for no limit)',
        default: -1, // no limit
        parser: parseInt,
        validators: [(x, raw) => !isNaN(x) || `${raw} is not a number`],
    },
    max_concurrent_jobs: {
        desc: 'Maximum number of concurrent jobs to run at one time',
        default: 256,
        parser: parseInt,
        validators: [x => x > 0 || `${x} cannot be negative`],
    },
    packages: {
        desc: 'The directory for language environments',
        default: './my_engine_data/packages',
        validators: [x => fs.existsSync(x) || `The directory ${x} doesnt exist`]
    }
}


function apply_validators(validators, validator_parameters) {
    for (const validator of validators) {
        const validation_response = validator(...validator_parameters);
        if (validation_response !== true) {
            return validation_response;
        }
    }
    return true;
}

let config = {};

for (const option_name in options) {
    const env_key = 'MY_ENGINE_' + option_name.toUpperCase();
    const option = options[option_name];
    const parser = option.parser || (x => x);
    const env_val = process.env[env_key];
    const parsed_val = parser(env_val);
    const value = env_val === undefined ? option.default : parsed_val;
    const validator_parameters =
        env_val === undefined ? [value, value] : [parsed_val, env_val];
    const validation_response = apply_validators(
        option.validators,
        validator_parameters
    );
    if (validation_response !== true) {
        logger.error(
            `Config option ${option_name} failed validation:`,
            validation_response
        );
        process.exit(1);
    }
    config[option_name] = value;
}

logger.info('Configuration successfully loaded.');

module.exports = config;
