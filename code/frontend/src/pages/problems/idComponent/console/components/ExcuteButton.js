import {useEffect, useState} from "react";

export const BUTTON_TYPE = {
    RUN : "run",
    SUBMIT : "submit"
}

export default function ExecuteButton({type, handleRunClick, ...props}) {
    const [buttonStyle, setButtonStyle] = useState("");

    useEffect(() => {
        if (type === BUTTON_TYPE.SUBMIT) {
            setButtonStyle("text-white bg-[#2Db55D]")
        } else {
            setButtonStyle("text-[#835A59] bg-[#F2F3F4]")
        }
    }, [])

    const onClick = function() {
        if (typeof handleRunClick === 'function') {
            handleRunClick();
        } else {
            console.error("RunButton: handleRunClick is not a function")
        }
    }

    return (
        <button
            className={`${props.className ? props.className : ""} py-[6px] px-4 rounded-md ${buttonStyle} font-semibold`}
            onClick={onClick}
        >
            {
                (type === BUTTON_TYPE.SUBMIT) ? "Submit" : "Run"
            }
        </button>
    )
}
