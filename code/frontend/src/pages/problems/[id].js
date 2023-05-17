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
            <div className={`h-full bg-[#F0F0F0] p-1`} style={{
                width : problemDetailWidth
            }}>
                <ProblemDetail/>
            </div>
            <div
                className={"w-1 h-full cursor-ew-resize hover:bg-blue-500"
            }
                 onDrag={(event) => {
                     console.log(event.clientX);
                     setProblemDetailWidth(event.clientX);
                 }}
                onDragEnd={(event) => {
                    setProblemDetailWidth(event.clientX);
                }}
                 draggable
            >
            </div>
            <div className={"flex-1 h-full flex flex-col"}>
                <div className={"w-full flex-1 bg-[#F0F0F0]"}>
                    <TextEditor/>
                </div>
                <ProblemConsole/>
            </div>

        </div>
    );
}