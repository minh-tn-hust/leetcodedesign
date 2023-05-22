import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {changeToAdminPage} from "@/reducers/appRoutes/appRoutesReducer";
import FeatureBar from "@/pages/admin/components/FeatureBar";
import ExecuteButton, {BUTTON_TYPE} from "@/pages/problems/idComponent/console/components/ExcuteButton";
import ProblemList from "@/pages/admin/components/ProblemList";

export const ADMIN_FEATURE = {
    MANAGE_PROBLEM : "manageproblem"
}

export default function AdminstrationPage(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(changeToAdminPage())
    }, [])

    const features = [
        {enum : ADMIN_FEATURE.MANAGE_PROBLEM,title : "Manage Problems", onClick : () => {}}
    ]

    return (
        <div className={"w-full h-auto flex flex-row items-center justify-center"}>
            <div className={"w-[1152px]"}>
                <h1 className={"font-bold text-2xl py-3"}>Administration</h1>
                <FeatureBar listFeature={features} currentFeature={ADMIN_FEATURE.MANAGE_PROBLEM}/>
                <div className={"mt-2"}/>
                <div className={"w-full flex flex-row justify-end"}>
                    <ExecuteButton
                        title={"Create challenge"}
                        type={BUTTON_TYPE.CREATE}
                        handleRunClick={() => {}}
                    />
                </div>
                <div className={"mt-2"}/>
                <ProblemList/>

            </div>
        </div>
    )
}