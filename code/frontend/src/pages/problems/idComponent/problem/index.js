import {Button, ButtonGroup} from "@mui/material";
import {useEffect, useState} from "react";
import Description from "@/pages/problems/idComponent/problem/components/Description";
import Submission from "@/pages/problems/idComponent/problem/components/Submission";
import ButtonTab from "@/shared/buttonTab";

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
            <div className={"w-full border-b border-b-[#F2F3F4] flex flex-row"}>
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