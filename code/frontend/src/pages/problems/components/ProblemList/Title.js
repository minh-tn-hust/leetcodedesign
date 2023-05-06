import {ProblemStatusEnum} from "@/constants/problemStatus";
import {useEffect, useState} from "react";

/**
 * @param {String | ProblemStatusEnum.HEADER} title
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Title({title, ...props}) {
    const [displayContent, setDisplayContent] = useState("")

    useEffect(() => {
        setDisplayContent(getDisplayContent);
    }, [])

    function getDisplayContent() {
        switch (title) {

            case ProblemStatusEnum.HEADER:
                return (
                    <div className={"font-semibold"}>Title</div>
                );

            default:
                return title;
        }
    }

    return (
        <div className={"flex-1 flex flex-row items-center justify-start pl-2 hover:text-[#1eb6d4] cursor-pointer"}>
            {displayContent}
        </div>
    );
};
