import {useEffect, useState} from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExecuteButton, {BUTTON_TYPE} from "@/pages/problems/idComponent/console/components/ExcuteButton";
import ButtonTab from "@/shared/buttonTab";

const ConsoleBarAreaEnum = {
    TEST_CASE : "testcase",
    RESULT : "result"
}

function ConsoleBar(props) {
    const [area, setArea] = useState(ConsoleBarAreaEnum.TEST_CASE);

    const handleChangeArea = function(newArea) {
        setArea(newArea);
    }

    const isTestcaseArea = () => area === ConsoleBarAreaEnum.TEST_CASE;
    const isResultArea = () => area === ConsoleBarAreaEnum.RESULT;

    return (
        <div className={"w-full bg-white rounded-md px-2 py-2"}>
            <ButtonTab
                title={"Test case"}
                isSelected={isTestcaseArea()}
                onClickCallback={() => handleChangeArea(ConsoleBarAreaEnum.TEST_CASE)}
            />
            <ButtonTab
                title={"Result"}
                isSelected={isResultArea()}
                onClickCallback={() => handleChangeArea(ConsoleBarAreaEnum.RESULT)}
            />
        </div>

    );
}

function ConsoleDetail(props) {
    return (
        <div className={"w-full h-[300px]"}>
            <ConsoleBar/>
        </div>
    );
}

export default function ProblemConsole(props) {
    const [isExpanded, setExpanded] = useState(false);

    const handleConsoleClick = function() {
        setExpanded(!isExpanded);
    }

    return (
        <div className={"bg-white rounded-md"}>
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