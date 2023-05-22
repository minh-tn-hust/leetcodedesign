import {Button, TextField} from "@mui/material";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-markdown"

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import ExecuteButton, {BUTTON_TYPE} from "@/pages/problems/idComponent/console/components/ExcuteButton";
import ReactMarkdownRender from "@/shared/utilities/MarkdownRender";
import {useEffect, useState} from "react";

function MarkdownPreview({mardownSource, ...props}) {
    return (
        <div className={"flex-1 border overflow-y-scroll"}>
            <ReactMarkdownRender markdownSource={mardownSource}/>
        </div>
    )
}

export default function MarkdownEditor({title, value, onChange, editorClass,...props}) {

    const [editorClasses, setEditorClasses] = useState("flex flex-row w-full")

    useEffect(() => {
        if (editorClass) {
            setEditorClasses((state) => state + " " + editorClass);
        } else {
            setEditorClasses((state) => state + " " + "h-32");
        }
    }, [editorClass]);

    const [isShowPreview, setShowPreview] = useState(false);

    const handleShowPreview = function() {
        setShowPreview(state => !state);
    }

    const handleChangeDescription = function (value) {
        if (typeof onChange === 'function') {
            onChange(value);
        } else {
            console.error("Admin/ProblemDescription: onChange is not a function");
        }
    }

    return (
        <div className={"w-full"}>
            <div className={"w-full h-12 bg-[#F0F0F0] rounded-tl-xl rounded-tr-xl mr-2 flex flex-row justify-between items-center pl-3 pr-3"}>
                <div className={"font-semibold"}>{title}</div>
                <ExecuteButton title={"Preview"} type={BUTTON_TYPE.CREATE} handleRunClick={handleShowPreview}/>
            </div>
            <div className={editorClasses}>
                <AceEditor
                    className={"flex-1"}
                    placeholder="Insert your description here"
                    mode={"markdown"}
                    theme="textmate"
                    name="blah2"
                    onChange={handleChangeDescription}
                    fontSize={16}
                    width={"100%"}
                    height={"100%"}
                    showGutter={true}
                    highlightActiveLine={true}
                    showPrintMargin={false}
                    value={value}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}/>
                {
                    isShowPreview ? <MarkdownPreview mardownSource={value}/> : <></>
                }

            </div>
            <div/>
            <div className={"w-full h-3 bg-[#F0F0F0] rounded-bl-xl rounded-br-xl mr-2"}/>
        </div>
    );
}
