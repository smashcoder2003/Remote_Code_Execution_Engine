let properties = {
    java : {
        compiled: true,
        normal_extension: 'java',
        compiled_extension: 'class',
        version: 'Jre11',
    },
    python: {
        compiled: false,
        normal_extension: 'py',
        version:  '3.10',
    },
    r: {
        compiled: false,
        normal_extension: 'r',
        version: '3.6+'
    }
}

function generateoutput() {
   const selectedLanguage = document.getElementById("language").value;
   const version = selectedLanguage.split('-')[1] || "";
   const language = selectedLanguage.split('-')[0] || "";
   const codeContent = document.getElementById("codeInput").value;
   let fileExtension;
   if (properties[language].compiled)
       fileExtension = properties[language].compiled_extension;
   else
    fileExtension = properties[language].normal_extension;
   
   const jsonObject = {
       "language": language,
       "version": version,
       "file":
           {
               "name": `solution.${fileExtension}`,
               "content": codeContent
           }
       ,
       "stdin": "",
       "args": [],
       "compile_timeout": 10000,
       "run_timeout": 3000,
       "compile_memory_limit": -1,
       "run_memory_limit": -1,
       "qid":"qid1",
   };


    const jsonOutput = document.getElementById("jsonOutput");

    let api_url = "http://localhost:2000/api/run";
    console.log(JSON.stringify(jsonObject));

   fetch(api_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonObject),

    }) .then( (response) => {
        if (response.status === 201) {
            return response.json()
                .then((data) => {
                    jsonOutput.value = JSON.stringify(data);
                });
        }

        if (!response.ok)
            throw new Error("Response was not ok");

        if (response.status === 200){
            return response.json();
        }

        })
        .then((data) => {
           jsonOutput.value = data["stdout"];
        })
       .catch((error) => {
           console.log(error);
       });
}