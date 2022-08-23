import React from 'react'
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-solarized_dark"
import "ace-builds/src-noconflict/theme-cobalt"
import "ace-builds/src-noconflict/theme-clouds"
import "ace-builds/src-noconflict/theme-textmate"
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-cloud9_night";


const Editor = ({ handleChange, snippet, isReadonly}) => {
    function onChange(newValue) {
        handleChange({ target: { name: "code", value: newValue } })
    }

    // Render editor
    return (
        <AceEditor
            setOptions={{ useWorker: false }}
            mode="javascript"
            onChange={onChange}
            theme="cobalt"
            name="code"
            fontSize={16}
            showGutter={true}
            value={snippet}
            showPrintMargin={false}
            highlightActiveLine={false}
            readOnly={isReadonly}
            style={{ margin: 0, padding: 0, minHeight: '100%', minWidth: '100%' }}
            editorProps={{ $blockScrolling: true }}
        />
    );

}

export default Editor

