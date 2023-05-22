import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import {PROBLEM_STATUS} from "@/constants/problemStatus";
import {red} from "@mui/material/colors";
import {useEffect, useState} from "react";
/**
 * @param {PROBLEM_STATUS} content
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Status({status, ...props}) {
    const [displayContent, setDisplayContent] = useState("");

    useEffect(() => {
        setDisplayContent(getDisplayContent());
    }, [])

    function getDisplayContent() {
        switch (status) {
            case PROBLEM_STATUS.NONE:
                return "";

            case PROBLEM_STATUS.HEADER:
                return (
                    <div className={"font-semibold"}>Status</div>
                );

            case PROBLEM_STATUS.SOLVED:
                return (
                    <DoneAllIcon color={"success"}/>
                );

            case PROBLEM_STATUS.UNSOLVED:
                return (
                    <RemoveDoneIcon sx={{color : red[500]}}/>
                );

            default:
                return "";
        }
    }

    return (
        <div className={"pl-2 w-16 text-center flex flex-row items-center justify-start"}>
            {
                displayContent
            }
        </div>
    )
}
