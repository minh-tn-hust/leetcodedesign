import {HARD_LEVEL, PROBLEM_STATUS} from "@/constants/problemStatus";
import {useEffect, useState} from "react";

/**
 * @param {HARD_LEVEL | PROBLEM_STATUS.HEADER} title
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

const color = {
    easy: ['text-green-600', "Easy"],
    medium: ['text-yellow-500', "Medium"],
    hard: ['text-red-300', "Hard"]
};

const COLOR = 0;
const TITLE = 1;

export default function Difficulty({hardLevel, ...props}) {
    const [displayContent, setDisplayContent] = useState("");


    useEffect(() => {
        setDisplayContent(getDisplayContent());
    }, [])
    function getDisplayContent() {
        switch (hardLevel) {
            case PROBLEM_STATUS.HEADER:
                return (
                    <div className={"font-semibold"}>Difficulty</div>
                );

            case HARD_LEVEL.HARD:
            case HARD_LEVEL.MEDIUM:
            case HARD_LEVEL.EASY:
                return (
                    <div className={`${color[hardLevel][COLOR]} font-semibold`}>{color[hardLevel][TITLE]}</div>
                );

            default:
                return "";
        }
    }

    return (
        <div className={"w-20 flex flex-row items-center justify-start pl-2"}>
            {
                displayContent
            }
        </div>
    );
};
