import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {changeToAdminPage} from "@/reducers/appRoutes/appRoutesReducer";
import FeatureBar from "@/pages/admin/components/FeatureBar";
import {Detail} from "@/pages/admin/idComponents/Detail";
import {Language} from "@/pages/admin/idComponents/Language";
import {Setting} from "@/pages/admin/idComponents/Setting";
import {Testcase} from "@/pages/admin/idComponents/Testcase";

export const MANIPULATE_PROBLEM_FEATURE = {
    DETAIL : "detail",
    TEST_CASE : "testcase",
    LANGUAGE : "language",
    SETTING : "settings"
}

export default function ProblemDetailPage(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeToAdminPage())
    }, [])


    const [currentFeature, setFeature] = useState(MANIPULATE_PROBLEM_FEATURE.DETAIL);

    const handleDetailClick = function() {
        setFeature(feature => MANIPULATE_PROBLEM_FEATURE.DETAIL);
    }

    const handleTestCaseClick = function() {
        setFeature(feature => MANIPULATE_PROBLEM_FEATURE.TEST_CASE);
    }

    const handleLanguageClick = function() {
        setFeature(feature => MANIPULATE_PROBLEM_FEATURE.LANGUAGE);
    }

    const handleSettingClick = function() {
        setFeature(feature => MANIPULATE_PROBLEM_FEATURE.SETTING);
    }

    const renderPart = function() {
        switch (currentFeature) {
            case MANIPULATE_PROBLEM_FEATURE.TEST_CASE:
                return <Testcase/>;
            case MANIPULATE_PROBLEM_FEATURE.DETAIL:
                return <Detail/>;
            case MANIPULATE_PROBLEM_FEATURE.LANGUAGE:
                return <Language/>;
            case MANIPULATE_PROBLEM_FEATURE.SETTING:
                return <Setting/>;
        }
    }

    const features = [
        {enum : MANIPULATE_PROBLEM_FEATURE.DETAIL, title: "Detail", onClick: handleDetailClick},
        {enum : MANIPULATE_PROBLEM_FEATURE.TEST_CASE, title : "Test Case", onClick: handleTestCaseClick},
        {enum : MANIPULATE_PROBLEM_FEATURE.LANGUAGE, title : "Language", onClick: handleLanguageClick},
        {enum : MANIPULATE_PROBLEM_FEATURE.SETTING, title : "Settings", onClick: handleSettingClick}
    ]

   return (
        <div className={"w-full h-auto flex flex-row items-center justify-center"}>
            <div className={"w-[1152px]"}>
                <h1 className={"font-bold text-2xl py-3"}>Problem Name Here</h1>
                <FeatureBar listFeature={features} currentFeature={currentFeature}/>
                <div className={"mt-8"}/>
                {
                    renderPart()
                }
            </div>
        </div>
    )
}