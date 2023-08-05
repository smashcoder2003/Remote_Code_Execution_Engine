import * as cp from "child_process";
import * as path from 'path';


let stdout="", stderr="";

(async () => {
    let result = await new Promise((resolve, reject) => {
        let ps = cp.spawn("python3", ["./api/src/test.py"]);
        ps.stdout.on('data', (data) => {
            stdout += data;
        });


        ps.stderr.once('data', (data) => {
            stderr += data.toString().replace(/File "(.*?)\/([^\/]+)",/, `${path.dirname(ps.spawnargs[1])},`);
        });



        ps.on('close', (code) => {
            resolve({
                stdout: stdout,
                stderr: stderr,
                exitCode: code,
            });
        });
    });
    console.log(result.stderr);
})();

