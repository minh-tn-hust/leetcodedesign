import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-csharp";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";

export const LanguageEnum = {
    JAVASCRIPT: "javascript",
    JAVA: "java",
    PYTHON: "python",
    RUBY: "ruby",
    GOLANG: "golang",
    CSHARP: "csharp",
}

export const LanguageTemplate = {
    javascript: `function helloWorld(something) {
  console.log("helloWorld: " + something);
}
`,
    java: `public static void helloWorld(String something) {
  System.out.println("helloWorld: " + something);
}
`,
    python: `def helloWorld(something):
  print("helloWorld: " + something)
`,
    ruby: `def helloWorld(something)
  puts "helloWorld: " + something
end
`,
    golang: `func helloWorld(something string) {
  fmt.Println("helloWorld: " + something)
}
`,
    csharp: `public static void helloWorld(string something) {
  Console.WriteLine("helloWorld: " + something);
}
`,
}

function ConfigEditorBar({handleChangeLanguage, ...props}) {
    const [selectedLanguage, setLanguage] = useState(LanguageEnum.JAVASCRIPT);
    const onChangeLanguageType = function (language) {
        if (typeof handleChangeLanguage === "function") {
            handleChangeLanguage(language);
            setLanguage((curLanguage) => language);
        } else {
            console.error("ConfigEditorBar: handleChangeLanguage is not a function")
        }
    }

    return (
        <div className={"w-full h-9 bg-white rounded-t-md border-b flex flex-row items-center px-2"}>
            <select name="pets" id="pet-select" value={selectedLanguage} onChange={(event) => {
                onChangeLanguageType(event.target.value);
            }}>
                {
                    Object.keys(LanguageEnum).map((key, index) => {
                        return <option key={"LANGUAGE_KEY_" + index} value={LanguageEnum[key]}>{key.toLowerCase()}</option>
                    })
                }
            </select>
        </div>
    );
}

export default function TextEditor(props) {
    const [selectedLanguage, setLanguage] = useState(LanguageEnum.JAVASCRIPT);
    const [code, setCode] = useState(LanguageTemplate[selectedLanguage]);

    const handleChangeLanguage = function(language) {
        setLanguage(language);
        setCode(LanguageTemplate[language]);
    }

    const onLoad = () => {}
    const onChange = (value) => {
        setCode(value);
    }


    return (
        <div className={"w-full h-full rounded-md p-1 flex flex-col"}>
            <ConfigEditorBar
                handleChangeLanguage={handleChangeLanguage}
            />
            <div className={"flex-1"}>
                <AceEditor
                    placeholder="Insert your code inside of this"
                    mode={selectedLanguage}
                    theme="textmate"
                    name="blah2"
                    onLoad={onLoad}
                    onChange={onChange}
                    fontSize={16}
                    width={"100%"}
                    height={"100%"}
                    showGutter={true}
                    highlightActiveLine={true}
                    showPrintMargin={false}
                    value={code}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}/>
            </div>
            <div className={"w-full h-[15px] bg-white rounded-b-md"}></div>
        </div>
    );

}