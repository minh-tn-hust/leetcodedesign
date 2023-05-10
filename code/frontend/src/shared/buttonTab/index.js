import {useEffect, useState} from "react";

export default function ButtonTab({title, isSelected, onClickCallback, props}) {
    const [buttonStyle, setButtonStyle] = useState("mx-2")

    const handleClick = function() {
        if (typeof onClickCallback === 'function') {
            onClickCallback();
        } else {
            console.error("ButtonTab: onClickCallback is not a function");
        }
    }


    useEffect(() => {
        if (isSelected) {
            setButtonStyle((state) => "mx-2 py-3 color-black font-semibold border-b border-b-black")
        } else {
            setButtonStyle((state) => "mx-2 py-3 color-[#5C95CB] font-normal")
        }
    })

    return (
        <button
            className={buttonStyle}
            onClick={handleClick}
        >
            {title}
        </button>
    )
}
