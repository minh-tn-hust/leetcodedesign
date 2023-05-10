import {Button, ButtonGroup} from "@mui/material";
import {useEffect, useState} from "react";
import Description from "@/pages/problems/idComponent/problem/components/Description";
import Submission from "@/pages/problems/idComponent/problem/components/Submission";

function ButtonTab({title, isSelected, onClickCallback, props}) {
    const [buttonStyle, setButtonStyle] = useState("mx-2")

    const handleClick = function() {
        if (typeof onClickCallback === 'function') {
            onClickCallback();
        } else {
            console.error("ButtonTab: onClickCallback is not a function");
        }
    }


    useEffect(() => {
        if (isSelected) {
            setButtonStyle((state) => "mx-2 color-black font-semibold border-b border-b-black")
        } else {
            setButtonStyle((state) => "mx-2 color-[#5C95CB] font-normal")
        }
    })

    return (
        <button
            className={buttonStyle}
            onClick={handleClick}
        >
            {title}
        </button>
    )
}

const TAB_ENUM = {
    DESCRIPTION : "description",
    SUBMISSIONS : "submissions"
}

export default function ProblemDetail(props) {
    const [tabSelected, setTabSelected] = useState(TAB_ENUM.DESCRIPTION)
    const isTabDescription = function() {
        return tabSelected === TAB_ENUM.DESCRIPTION;
    }

    const isTabSubmission = function() {
        return tabSelected === TAB_ENUM.SUBMISSIONS;
    }

    const handleSelectTab = function(tab) {
        setTabSelected((state) => tab);
    }


    return (
        <div className={"w-full h-full bg-white rounded-md flex flex-col"}>
            <div className={"w-full h-9 border-b border-b-[#F2F3F4] flex flex-row"}>
                <ButtonTab
                    title={"Description"}
                    isSelected={isTabDescription()}
                    onClickCallback={() => handleSelectTab(TAB_ENUM.DESCRIPTION)}

                />
                <ButtonTab
                    title={"Submissions"}
                    isSelected={isTabSubmission()}
                    onClickCallback={() => handleSelectTab(TAB_ENUM.SUBMISSIONS)}
                />
            </div>
            <div className={"w-full flex-1 p-2 overflow-y-scroll"}>
                {
                    (tabSelected === TAB_ENUM.DESCRIPTION) ? <Description/> : <Submission/>
                }
            </div>
        </div>
    )
}