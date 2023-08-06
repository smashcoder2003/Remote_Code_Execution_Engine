import fs from 'fs';

(async () => {
    const { default: fetchModule } = await import('node-fetch');
    const fetch = fetchModule;

    const url = 'http://localhost:2000/api/execute'; // Single URL

    const body = fs.readFileSync("/Users/bunty/Documents/GitHub/Remote_Code_Execution_Engine/public/code.json", 'utf8');

    const fetchPromises = [];

    for (let i = 0; i < 10000; i++) {
        fetchPromises.push(
            fetch(url, {
                method: "POST",
                timeout: 100000000,
                headers: {
                    "Content-Type": "application/json",
                },
                body: body
            })
                .then(response => response)
                .catch(error => {
                    console.error(error);
                })
        );
    }

    Promise.all(fetchPromises)
        .then(responses => {
            responses.forEach(response => {
                console.log(response);
            });
        });
})();
