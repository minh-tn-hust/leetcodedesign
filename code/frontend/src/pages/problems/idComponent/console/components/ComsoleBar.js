import {useState} from "react";
import ButtonTab from "@/shared/buttonTab";

const ConsoleBarAreaEnum = {
    TEST_CASE : "testcase",
    RESULT : "result"
}
export default function ConsoleBar(props) {
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
