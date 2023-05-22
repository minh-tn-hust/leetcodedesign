import {useEffect, useState} from "react";

function FeatureButton({title, onClickHandle, isSelected, ...props}) {
    const commonStyle = "px-4 h-10 relative ";
    const disableStyle = commonStyle + "bg-inherit text-[#979FB4] font-semibold";
    const enableStyle = commonStyle + "px-4 bg-white text-black font-semibold border";

    const [buttonClass, setButtonClass] = useState(disableStyle);

    useEffect(() => {
        if (isSelected) {
            setButtonClass((curClass) => enableStyle);
        } else {
            setButtonClass((curClass) => disableStyle);
        }
    }, [isSelected]);

    const handleClick = function () {
        if (typeof onClickHandle === 'function') {
            onClickHandle();
        } else {
            console.error("FetureButton: onClickHandle is not a function");
        }
    }

    return (
        <button
            onClick={handleClick}
            className={buttonClass}
        >
            {title}
            {
                isSelected ? <div className={"absolute w-full h-2 -bottom-1 left-0 z-50 bg-white"}></div> : <></>
            }
        </button>
    )
}

export default function FeatureBar({listFeature, currentFeature,...props}) {
    return (
        <div className={"w-full h-[60px] bg-[#F8F9FA] flex flex-row items-end border px-3"}>
            {
                listFeature.map((feature, index) => {
                    return (
                        <FeatureButton
                            key={"feature_key" + index}
                            title={feature.title}
                            isSelected={feature.enum === currentFeature}
                            onClickHandle={feature.onClick}
                        />);
                })
            }

        </div>
    );
}
