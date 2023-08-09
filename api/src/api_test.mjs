import fs from 'fs';
console.time("MY_ENGINE");
(async () => {
    const { default: fetchModule } = await import('node-fetch');
    const fetch = fetchModule;

    const url = 'http://localhost:2000/api/execute'; // Single URL

    const body = fs.readFileSync("/Users/bunty/Documents/GitHub/Remote_Code_Execution_Engine/public/code.json", 'utf8');

    const fetchPromises = [];

    for (let i = 0; i < 200; i++) {
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
                console.log(responses);
                console.timeEnd("MY_ENGINE")
        });
})();
