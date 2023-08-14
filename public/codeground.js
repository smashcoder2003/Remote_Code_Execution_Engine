function generateoutput() {
   const selectedLanguage = document.getElementById("language").value;
   const version = selectedLanguage.split('-')[1] || "";
   const language = selectedLanguage.split('-')[0] || "";
   const codeContent = document.getElementById("codeInput").value;
   const fileExtension = language === 'python'?'py':"java";
   
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

    let api_url = "http://192.168.130.1:2000/api/run";
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