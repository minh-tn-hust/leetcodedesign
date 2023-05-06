import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import {ProblemStatusEnum} from "@/constants/problemStatus";
import {red} from "@mui/material/colors";
import {useEffect, useState} from "react";
/**
 * @param {ProblemStatusEnum} content
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
            case ProblemStatusEnum.NONE:
                return "";

            case ProblemStatusEnum.HEADER:
                return (
                    <div className={"font-semibold"}>Status</div>
                );

            case ProblemStatusEnum.SOLVED:
                return (
                    <DoneAllIcon color={"success"}/>
                );

            case ProblemStatusEnum.UNSOLVED:
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
