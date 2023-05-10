import ReactMarkdown from "react-markdown";
import ReactMarkdownRender from "@/shared/utilities/MarkdownRender";
import ASSET from "@/shared/assets";
import {Roboto_Mono} from 'next/font/google';


const roboto = Roboto_Mono({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});

function Title({title, ...props}) {
    return (
        <div className={"font-[500] text-2xl"}>
            {title}
        </div>
    )
}

function ProblemDescription({description, ...props}) {
    return (
        <div className={"mt-4"}>
            <ReactMarkdownRender/>
        </div>
    )
}


function ProblemExample({title, description, img, input, output, explaination}) {
    return (
        <div className={"mt-4"}>
            <div className={"font-semibold text-xl mb-2"}>{title}</div>
            <img src={ASSET.DEMO1.src}/>
            <div className={"w-full mt-2 bg-[#F7F7F8] rounded-md p-2 " + roboto.className}>
                <p>
                    <strong>Input:</strong> {input}
                </p>
                <p>
                    <strong>Output:</strong> {output}
                </p>
                <p>
                    <strong>Explaination:</strong> {explaination}
                </p>
            </div>
        </div>
    )
}

function ListContraints({props}) {
    return (
        <div className={"mt-4 " + roboto.className}>
            <div><strong>Constraint:</strong></div>
            <ul className={"list-disc"}>
                <li className={"px-1 max-w-fit bg-[#F7F7F8] rounded-sm my-1"}>{"nums1.length == m"}</li>
                <li className={"px-1 max-w-fit bg-[#F7F7F8] rounded-sm my-1"}>{"nums2.length == n"}</li>
                <li className={"px-1 max-w-fit bg-[#F7F7F8] rounded-sm my-1"}>{"0 < m <= 1000"}</li>
                <li className={"px-1 max-w-fit bg-[#F7F7F8] rounded-sm my-1"}>{"0 < n <= 1000"}</li>
                <li className={"px-1 max-w-fit bg-[#F7F7F8] rounded-sm my-1"}>{"0 < m + n <= 2000"}</li>
                <li className={"px-1 max-w-fit bg-[#F7F7F8] rounded-sm my-1"}>{"0 <= nums1[i], nums2[i] <= 106"}</li>
            </ul>
        </div>
    )

}

export default function Description({title, ...props}) {
    title = "59. Spiral Matrix II";
    return (
        <div className={"w-full h-full flex flex-col"}>
            <Title title={title}/>
            <ProblemDescription/>
            <ProblemExample
                title={"Example 1"}
                input={"n = 3"}
                output={"[[1,2,3],[8,9,4],[7,6,5]]"}
                explaination={"merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."}
            />
            <ProblemExample
                title={"Example 2"}
                input={"n = 3"}
                output={"[[1,2,3],[8,9,4],[7,6,5]]"}
                explaination={"merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."}
            />
            <ListContraints/>
        </div>
    )
}