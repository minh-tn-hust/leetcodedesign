import Link from "next/link";
import Image from "next/image";
import ASSET from "@/shared/assets";
import {Button} from "@mui/material";
import {useState} from "react";

function NavBarLink({href, title, isSelected, handleChangePage,...props}) {

    const onChangePage = function() {
        if (typeof handleChangePage === 'function') {
            handleChangePage();
        } else {
            console.error("NavBarLink: handleChangePage is not a function");
        }
    };

    const normalStyle = "color-gray";
    const selectedStyle = "color-black font-semibold border-b-[2px] border-b-black";

    return (
        <Link
            className={`hover:bg-blue mr-2 flex flex-row items-center text-center px-2 py-auto ${ isSelected ? selectedStyle : normalStyle}`}
            href={href}
            onClick={onChangePage}
        >{title}</Link>
    );
}

export default function NavBar(props) {
    const [page, setPage] = useState(0);

    const handleChangePage = function(toPage) {
        setPage(page => toPage);
    };

    const route = [
        {href : "/", title : "Homepage"},
        {href : "/", title : "Problems"},
        {href : "/", title : "Somethings"},
    ]

    return (
        <div className={"w-full flex flex-row justify-center fixed top-0 right-0 drop-shadow-xl bg-white"}>
            <div className={"w-[1152px] flex flex-row justify-between"}>
                <div className={"flex flex-row"}>
                    <Link href={"/"} onClick={() => handleChangePage(0)}>
                        <img
                            src={ASSET.LOGO.src}
                            alt={"Logo"}
                            className={"w-[30px] mr-3 my-1"}
                        />
                    </Link>
                    {
                        route.map((route, index) => {
                            return (<NavBarLink
                                key={"NavBarLink" + index}
                                href={route.href}
                                title={route.title}
                                isSelected={page === index}
                                handleChangePage={() => handleChangePage(index)}
                            />)
                        })
                    }
                </div>
                <NavBarLink
                    href={"/authentication"}
                    title={"Sign In"}
                    isSelected={false}
                    handleChangePage={() => handleChangePage(-1)}
                />
            </div>
        </div>
    );
}