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

function ProblemListSlot(props) {
    return (
        <div className={"w-full h-[40px] bg-blue-300 flex flex-row even:bg-[#F7F8FA] odd:bg-white"}>
            <Status status={ProblemStatusEnum.UNSOLVED}/>
            <Title title={"Some thing that matter, you need to check thí"}/>
            <Difficulty hardLevel={HardLevelEnum.MEDIUM}/>
        </div>
    )
};
export default function Index(props) {
    const a = [
        1, 2, 5, 3, 4,
        1, 2, 5, 3, 4,
        1, 2, 5, 3, 4,
        1, 2, 5, 3, 4,
        1, 2, 5, 3, 4,
        1, 2, 5, 3, 4,
        1, 2, 5, 3, 4,
        1, 2, 5, 3, 4,
    ];
    return (
        <div className={"w-full h-full"}>
            <ProblemListHeader/>
            {
                a.map((e, i) => {
                    return (
                        <ProblemListSlot key={"ProblemListSlot" + i}/>
                    );
                })
            }
        </div>
    );
}