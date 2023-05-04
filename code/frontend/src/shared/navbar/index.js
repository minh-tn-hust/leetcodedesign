import Link from "next/link";
import ASSET from "@/shared/assets";
import {useState} from "react";
import NavBarLink from "@/shared/navbar/components/NavBarLink";

export default function NavBar(props) {
    const [page, setPage] = useState(0);

    const handleChangePage = function(toPage) {
        setPage(page => toPage);
    };

    const route = [
        {href : "/", title : "Homepage"},
        {href : "/problems", title : "Problems"},
    ]

    return (
        <div className={"w-full flex flex-row justify-center drop-shadow-md bg-white"}>
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