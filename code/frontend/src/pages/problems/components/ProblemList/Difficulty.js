import {HardLevelEnum, ProblemStatusEnum} from "@/constants/problemStatus";

/**
 * @param {HardLevelEnum | ProblemStatusEnum.HEADER} title
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
    function displayContent() {
        switch (hardLevel) {

            case ProblemStatusEnum.HEADER:
                return (
                    <div className={"font-semibold"}>Difficulty</div>
                );

            case HardLevelEnum.HARD:
            case HardLevelEnum.MEDIUM:
            case HardLevelEnum.EASY:
                return (
                    <div className={`${color[hardLevel][COLOR]} font-semibold`}>{color[hardLevel][TITLE]}</div>
                );

            default:
                return "";
        }
    }

    return (
        <div className={"w-20 flex flex-row items-center justify-start pl-2"}>
            {displayContent()}
        </div>
    );
};
