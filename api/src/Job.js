const express = require('express');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const path = require('path');

let uid = 0;
let gid = 0;

class Job {
    constructor({ runtime, files, stdin, args, memory_limit, timeouts }) {
        this.uuid = uuidv4();
        this.runtime = runtime;

        this.files = files.map((file, i) => ({
            name: file.name || `file${i}.code`,
            content: file.content,
            encoding: ['utf8', 'base64', 'hex'].includes(file.encoding) ?
                file.encoding: 'utf8',
        }));

        this.stdin = stdin;

        if (this.stdin.slice(-1) !== '\n') {
            this.stdin += '\n';
        }

        this.args = args;
        this.memory_limit = memory_limit;
        this.timeouts = timeouts;

        this.uid = 1001 + uid;
        this.gid = 1001 + gid;

        uid++;
        gid++;

        uid %= (1500 - 1001 + 1);
        gid %= (1500 - 1001 + 1);

    };
}

job1 = new Job({
    "language": "python",
    "version": "3.10.0",
    "files": [
        {
            "name": "my_cool_code.py",
            "content": ""
        }
    ],
    "stdin": "",
    "args": ["1", "2", "3"],
    "compile_timeout": 10000,
    "run_timeout": 3000,
    "compile_memory_limit": -1,
    "run_memory_limit": -1
});

console.log(job1.files)
