import CategoryList from "@/pages/problems/components/CategoryList";
import ProblemFilter from "@/pages/problems/components/ProblemFilter";
import ProblemList from "@/pages/problems/components/ProblemList";
import ProblemAnalysis from "@/pages/problems/components/ProblemAnalysis";

export default function ProblemScreen(props) {
    return(
        <main className={"w-full flex flex-row justify-center"}>
            <div className={"w-[1152px] h-screen grid grid-cols-4 gap-4 pt-3"}>
                <div className={"col-span-3 h-full"}>
                    <CategoryList/>
                    <ProblemFilter/>
                    <ProblemList/>
                </div>
                <div className={"col-span-1 h-full"}>
                    <ProblemAnalysis/>
                </div>
            </div>
        </main>
    )

}