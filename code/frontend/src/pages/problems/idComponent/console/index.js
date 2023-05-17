import {useEffect, useState} from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExecuteButton, {BUTTON_TYPE} from "@/pages/problems/idComponent/console/components/ExcuteButton";
import ConsoleBar from "@/pages/problems/idComponent/console/components/ComsoleBar";
import {EXECUTE_CODE_STATUS, TestCaseResult} from "@/pages/problems/idComponent/console/components/TestCaseResult";



function ConsoleDetail({height = 200, listTestcase, ...props}) {
    return (
        <div className={"w-full"} style={{height : Math.max(height, 300)}}>
            <ConsoleBar/>
            <TestCaseResult/>
        </div>
    );
}

export default function ProblemConsole(props) {
    const [isExpanded, setExpanded] = useState(false);

    const handleConsoleClick = function() {
        setExpanded(!isExpanded);
    }

    return (
        <div className={"bg-white rounded-md m-1"}>
            {
                isExpanded ? <ConsoleDetail/> : <></>
            }
            <div className={"w-full flex flex-row items-between justify-between bg-white rounded-md p-2"}>
                <div
                    className={"my-auto font-semibold hover:text-blue cursor-pointer"}
                    onClick={handleConsoleClick}
                >
                    Console {isExpanded ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>}
                </div>
                <div className={"flex flex-row"}>
                    <ExecuteButton className={"mr-3"} type={BUTTON_TYPE.RUN}/>
                    <ExecuteButton type={BUTTON_TYPE.SUBMIT}/>
                </div>
            </div>

        </div>
    )
}