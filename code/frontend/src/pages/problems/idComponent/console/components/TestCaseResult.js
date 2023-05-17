export const EXECUTE_CODE_STATUS = {
    AC : "AC",
    TLE : "TEL",
    WA : "WA",
    RE : "RE",
    MLE : "MLE",
    NONE : "NONE"
}

export const EXECUTE_CODE_TITLE =  {
    AC : "Accepted",
    WA : "Wrong answer",
    RE : "Runtime Error",
    MLE : "Memory Limit Error",
    TLE : "Time Limit Execute",
    NONE : ""
}

export function ErrorCodeDisplay({errorCode, ...props}) {
    return (
        <div className={`w-full flex flex-row`}>
            <div>{ EXECUTE_CODE_TITLE[errorCode] }</div>
            <div>Runtime: 4ms</div>
        </div>
    )
}
export function TestCaseResult({errorCode, input, output, expected,...props}) {
    return (
        <div className={"w-full bg-yellow-300 px-2"}>
            {
                errorCode !== EXECUTE_CODE_STATUS.NONE ? <ErrorCodeDisplay errorCode={errorCode}/> : <></>
            }
        </div>
    )
}