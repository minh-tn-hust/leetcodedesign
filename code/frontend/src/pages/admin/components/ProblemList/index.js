import Link from "next/link";

function ProblemSlot({title, problemId, owner,props}) {
    const href = "admin/" + problemId
    return (
        <div className={"w-full flex flex-row items-center border border-1 h-10 odd:bg-[#F8F9Fa] even:bg-white"}>
            <Link href={href} className={"flex-1 pl-3 hover:text-blue-500 hover:font-semibold"}>{title}</Link>
            <div className={"flex-1"}>{owner}</div>
        </div>
    );
}

export default function ProblemList(props) {
    return (
        <div className={"w-full flex flex-col border border-b-0"}>
            <div className={"w-full flex flex-row items-center border border-1 h-10 odd:bg-[#F8F9Fa] even:bg-white"}>
                <div className={"flex-1 pl-3 font-bold"}>{"Problem Name"}</div>
                <div className={"flex-1 font-bold"}>{"Owner"}</div>
            </div>
            <ProblemSlot title={"Test problem 1"} problemId={"a"} owner={"minh-tn-hust"}/>
            <ProblemSlot title={"Test problem 1"} problemId={"b"} owner={"minh-tn-hust"}/>
            <ProblemSlot title={"Test problem 1"} problemId={"c"} owner={"minh-tn-hust"}/>
            <ProblemSlot title={"Test problem 1"} problemId={"d"} owner={"minh-tn-hust"}/>
            <ProblemSlot title={"Test problem 1"} problemId={"e"} owner={"minh-tn-hust"}/>
            <ProblemSlot title={"Test problem 1"} problemId={"f"} owner={"minh-tn-hust"}/>
        </div>
    )
}