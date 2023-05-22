import HardLevel from "@/pages/admin/idComponents/Detail/components/HardLevel";
import {useState} from "react";
import {HARD_LEVEL} from "@/constants/problemStatus";
import ProblemName from "@/pages/admin/idComponents/Detail/components/ProblemName";
import dynamic from "next/dynamic";
import {set} from "react-hook-form";

const MarkdownEditor = dynamic(() => import('@/pages/admin/idComponents/Detail/components/MarkdownEditor'), {
    ssr: false,
});

export function Detail(props) {
    const [detailState, setDetailState] = useState({
        hardLevel: HARD_LEVEL.EASY,
        name: "Default Name Problem",
        description: "Fill problem description here",
        statement: "Fill problem statement here",
        input: "Fill problem input here",
        constraint: "Fill problem constraint here",
        output: "Fill problem output here",
        tags: ""
    })

    const onChangeHardLevel = function (value) {
        setDetailState((state) => {
            return {
                ...state,
                hardLevel: value
            }
        })
    }

    const onChangeProblemName = function (value) {
        setDetailState((state) => {
            return {
                ...state,
                name: value
            }
        })
    }

    const onChangeDescription = function (value) {
        setDetailState((state) => {
            return {
                ...state,
                description: value
            }
        })
    }

    const onChangeStatement = function (value) {
        setDetailState((state) => {
            return {
                ...state,
                statement: value
            }
        })
    }

    const onChangeInput = function (value) {
        setDetailState((state) => {
            return {
                ...state,
                input: value
            }
        })
    }

    const onChangeOutput = function (value) {
        setDetailState((state) => {
            return {
                ...state,
                output: value
            }
        })
    }

    const onChangeConstraint = function (value) {
        setDetailState((state) => {
            return {
               ...state,
                constraint: value
            }
        })
    }

    return (
        <div>
            <HardLevel value={detailState.hardLevel} onChange={onChangeHardLevel}/>
            <div className={"mt-8"}/>
            <ProblemName value={detailState.name} onChange={onChangeProblemName}/>
            <div className={"mt-8"}/>
            <MarkdownEditor
                title={"Description"}
                value={detailState.description}
                onChange={onChangeDescription}
            />
            <div className={"mt-8"}/>
            <MarkdownEditor
                editorClass={"h-32"}
                title={"Problem Statement"}
                value={detailState.statement}
                onChange={onChangeStatement}
            />
            <div className={"mt-8"}/>
            <MarkdownEditor
                editorClass={"h-32"}
                title={"Input format"}
                value={detailState.input}
                onChange={onChangeInput}
            />
            <div className={"mt-8"}/>
            <MarkdownEditor
                editorClass={"h-32"}
                title={"Output format"}
                value={detailState.output}
                onChange={onChangeOutput}
            />
            <div className={"mt-8"}/>
            <MarkdownEditor
                editorClass={"h-32"}
                title={"Constraint"}
                value={detailState.constraint}
                onChange={onChangeConstraint}
            />
            <div className={"mb-16"}/>
        </div>
    )
}
