import Difficulty from "@/pages/problems/components/ProblemList/Difficulty";
import Status from "@/pages/problems/components/ProblemList/Status";
import Title from "@/pages/problems/components/ProblemList/Title";
import {HardLevelEnum, ProblemStatusEnum} from "@/constants/problemStatus";


function ProblemListHeader(props) {
    return (
        <div className={"w-full h-[40px] bg-blue-300 flex flex-row even:bg-[#F7F8FA] odd:bg-white"}>
            <Status status={ProblemStatusEnum.HEADER}/>
            <Title title={ProblemStatusEnum.HEADER}/>
            <Difficulty hardLevel={ProblemStatusEnum.HEADER}/>
        </div>
    )
};

/**
 * @param {ProblemSlot} problemSlot
 * @returns {JSX.Element}
 * @constructor
 */
function ProblemListSlot({problemSlotDetails}) {
    return (
        <div className={"w-full h-[40px] bg-blue-300 flex flex-row even:bg-[#F7F8FA] odd:bg-white"}>
            <Status status={problemSlotDetails.status}/>
            <Title title={problemSlotDetails.title}/>
            <Difficulty hardLevel={problemSlotDetails.hardLevel}/>
        </div>
    )
};
export default function ProblemList({listProblem, ...props}) {
    return (
        <div className={"w-full h-full"}>
            <ProblemListHeader/>
            {
                listProblem.map((e, i) => {
                    return (
                        <ProblemListSlot key={"ProblemListSlot" + i} problemSlotDetails={e}/>
                    );
                })
            }
        </div>
    );
}