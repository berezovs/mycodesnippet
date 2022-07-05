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


const Editor = ({handleChange, snippet}) => {
    function onChange(newValue) {
        handleChange({target:{name:"code", value: newValue}})
    }

    // Render editor
    return (
        <AceEditor
            mode="javascript"
            onChange={onChange}
            theme="monokai"
            name="code"
            fontSize={16}
            showGutter={true}
            value={snippet}
            showPrintMargin={false}
            highlightActiveLine={false}
            style={{ borderRadius: '10px', minWidth: '100%' }}
            editorProps={{ $blockScrolling: true }}
        />
    );

}

export default Editor

