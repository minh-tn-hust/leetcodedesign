function TestcaseSlot({title, problemId, owner,props}) {
    const href = "admin/" + problemId
    return (
        <div className={"w-full flex flex-row items-center border border-1 h-10 odd:bg-[#F8F9Fa] even:bg-white"}>
            <a href={href} className={"flex-1 pl-3 hover:text-blue-500 hover:font-semibold"}>{title}</a>
            <div className={"flex-1"}>{owner}</div>
        </div>
    );
}

export default function TestcaseList(props) {
    return (
        <div className={"w-full flex flex-col border border-b-0"}>
            <div className={"w-full flex flex-row items-center border border-1 h-10 odd:bg-[#F8F9Fa] even:bg-white"}>
                <div className={"flex-1 pl-3 font-bold"}>{"Order"}</div>
                <div className={"flex-1 font-bold"}>{"Input"}</div>
                <div className={"flex-1 font-bold"}>{"Output"}</div>
                <div className={"flex-1 font-bold"}>{"Explaination"}</div>
            </div>
            <TestcaseSlot title={"Test problem 1"} problemId={"a"} owner={"minh-tn-hust"}/>
            <TestcaseSlot title={"Test problem 1"} problemId={"b"} owner={"minh-tn-hust"}/>
            <TestcaseSlot title={"Test problem 1"} problemId={"c"} owner={"minh-tn-hust"}/>
            <TestcaseSlot title={"Test problem 1"} problemId={"d"} owner={"minh-tn-hust"}/>
            <TestcaseSlot title={"Test problem 1"} problemId={"e"} owner={"minh-tn-hust"}/>
            <TestcaseSlot title={"Test problem 1"} problemId={"f"} owner={"minh-tn-hust"}/>
        </div>
    )
}
