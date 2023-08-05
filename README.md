# Remote_Code_Execution_Engine
A remote code execution engine with frontend and backend.
The engine uses express.js as backed for creating the api.


# INSTALLATION
The engine uses docker as a primary sandbox engine.
The host system requirements are as follows, <br>
    -- Docker <br>
    -- DockerCompose (optional) <br>
    -- Internet Connection

Clone the repository and open the folder.
From the root directory of the folder run the following
commands <br>
    -- <i>sudo ./builder/my_engine.sh build </i> (to build the container image) <br>
    -- <i> sudo ./builder/my_engine.sh start </i> (to start the api container) <br>


The Container exposes a port on 2000 by default.
