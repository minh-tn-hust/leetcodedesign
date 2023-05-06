import CategoryList from "@/pages/problems/components/CategoryList";
import ProblemFilter from "@/pages/problems/components/ProblemFilter";
import Index from "@/pages/problems/components/ProblemList";
import ProblemAnalysis from "@/pages/problems/components/ProblemAnalysis";

export default function ProblemScreen(props) {
    return(
        <main className={"w-full flex flex-row justify-center px-2"}>
            <div className={"w-[1152px] h-screen grid grid-cols-4 gap-4 pt-3"}>
                <div className={"col-span-4 md:col-span-3 h-full"}>
                    <CategoryList/>
                    <ProblemFilter/>
                    <Index/>
                </div>
                <div className={"hidden md:contents md: md:col-span-1 h-full"}>
                    <ProblemAnalysis/>
                </div>
            </div>
        </main>
    )

}