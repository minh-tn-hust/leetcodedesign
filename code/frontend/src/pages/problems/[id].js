import {useRouter} from "next/router";


export default function DoingProblem({...props}) {
    const router = useRouter()
    const {id} = router.query;
    return (
        <div className={"w-full h-[922px] flex flex-row bg-blue-300"}>
        </div>
    );
}