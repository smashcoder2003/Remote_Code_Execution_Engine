import AceEditor from "react-ace";


import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/ext-language_tools";


function Editor() {
    const code = "var message = 'Monaco Editor!' \nconsole.log(message);";

    return (
        <AceEditor
            height="100px"
            value={code}
            mode="javascript"
            theme="solarized_light"
            fontSize="16px"
            highlightActiveLine={true}
            setOptions={{
                enableLiveAutocompletion: true,
                showLineNumbers: true,
                tabSize: 2
            }}
        />
    );
}

export default Editor;
