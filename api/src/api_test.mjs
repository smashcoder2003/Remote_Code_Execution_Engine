import fs from 'fs';

let fetch;

(async () => {
    const { default: fetchModule } = await import('node-fetch');
    fetch = fetchModule;

    const urls = [
        'http://localhost:2000/api/execute'
    ];

    for (let i = 0; i < 900; i++) {
        urls.push('http://localhost:2000/api/execute');
    }

    const body = fs.readFileSync("/Users/bunty/Documents/GitHub/Remote_Code_Execution_Engine/public/code.json", 'utf8');

    const fetchPromises = urls.map(url => fetch(url, {
        method: "POST",
        timeout: 1000000,
        headers: {
            "Content-Type": "application/json",
        },
        body: body
    }));

    Promise.all(fetchPromises)
        .then(responses => Promise.all(responses.map(response => response)))
        .then(dataArray => {
            console.log(dataArray);
        })
        .catch(error => {
            console.error(error);
        });
})();
