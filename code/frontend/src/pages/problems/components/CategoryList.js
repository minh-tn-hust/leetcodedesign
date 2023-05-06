import {Button, Collapse} from "@mui/material";
import {CategoryKey, ProblemCategory} from "@/constants/category";
import {useState} from "react";
import ExpandIcon from '@mui/icons-material/Expand';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import {HardLevelEnum, ProblemStatusEnum} from "@/constants/problemStatus";

function CategoryMember({cateKey, onChooseCategory, isChoosing, number, ...props}) {
    const handleChooseCategory = function () {
        if (typeof onChooseCategory === 'function') {
            onChooseCategory();
        } else {
            console.log("CategoryMember", "onChooseCategory is not a function");
        }
    }

    if (!cateKey) {
        console.log("cateKey is undefined");
        return;
    }

    return (
        <Button
            size={"small"}
            className={`px-2 py-1 text-black rounded-[10px] mr-2 mb-2 normal-case ${isChoosing ? "bg-[#bdbdbd] font-semibold" : ""}`}
            onClick={handleChooseCategory}
            variant={"outlined"}
        >
            {ProblemCategory[cateKey]}
        </Button>
    );
}

export default function CategoryList(props) {
    const [currentKey, setCurrentKey] = useState("$all");
    const [isExpand, setExpand] = useState(false);
    const handleChangeCategory = function(newCate) {
        let storedCate = "$" + newCate
        if (currentKey.includes(storedCate)) {
            let index = currentKey.indexOf(storedCate);
            setCurrentKey(currentKey => {
                return currentKey.replace(storedCate, '');
            });
        } else {
            setCurrentKey(currentKey => {
                return currentKey + storedCate;
            })
        }
    }

    const handleExpandCategory = function() {
        setExpand(isExpand => !isExpand);
    }

    return (
        <div className={"w-full flex flex-row"}>
            <div className={"flex-1 flex flex-wrap"}>
                {
                    CategoryKey.map((cateKey, index) => {
                        if (index > 5 && !isExpand) {
                            return;
                        }

                        return <CategoryMember
                            cateKey={cateKey}
                            key={"CateMember" + index}
                            isChoosing={currentKey.includes(`$${cateKey}`)}
                            onChooseCategory={() => handleChangeCategory(cateKey)}
                        />
                    })
                }
            </div>
            <div className={"flex flex-col"}>
                <Button
                    size={"small"}
                    className={"w-[156px] bg-[#0069be]"}
                    variant={"contained"}
                    onClick={handleExpandCategory}
                >
                    {
                        isExpand ? <UnfoldLessIcon/> : <ExpandIcon/>
                    }
                    {
                        (isExpand ? "Collapse " : "Expand ") + "(" + (currentKey.split("$").length - 1) + ")"
                    }
                </Button>
            </div>
        </div>
    );
}