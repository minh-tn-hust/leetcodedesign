import {useRouter} from "next/router";
import {useState} from "react";
import ProblemDetail from "@/pages/problems/idComponent/problem";
import ProblemConsole from "@/pages/problems/idComponent/console";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import('@/pages/problems/idComponent/editor'), {
    ssr: false,
});


export default function DoingProblem({...props}) {
    const [problemDetailWidth, setProblemDetailWidth] = useState(852);
    const router = useRouter()
    const {id} = router.query;
    return (
        <div className={"w-full min-h-[373px] h-[922px] flex flex-row bg-[#F0F0F0]"}>
            <div className={"w-4/12 h-full bg-[#F0F0F0] p-1"}>
                <ProblemDetail/>
            </div>
            <div className={"w-2 h-full bg-red-300 cursor-ew-resize"}>
            </div>
            <div className={"flex-1 h-full bg-yellow-300 flex flex-col"}>
                <div className={"w-full h-4/6 bg-[#F0F0F0]"}>
                    <TextEditor/>
                </div>
                <div className={"flex-1 bg-stone-300"}>
                    <ProblemConsole/>
                </div>
            </div>

        </div>
    );
}