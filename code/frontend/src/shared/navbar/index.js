import Link from "next/link";
import ASSET from "@/shared/assets";
import {useState} from "react";
import NavBarLink from "@/shared/navbar/components/NavBarLink";
import {
    changeToHomePage,
    changeToListProblem,
    changeToProblemPage,
    ROUTES
} from "@/reducers/appRoutes/appRoutesReducer";
import {useDispatch, useSelector} from "react-redux";
import {currentRoutes} from "@/reducers/appRoutes/appRoutesSelector";

export default function NavBar(props) {
    const page = useSelector(currentRoutes)
    const dispatch = useDispatch()

    const handleChangePage = function (toPage) {
        console.log(toPage);
        switch (toPage) {
            case ROUTES.HOME_PAGE:
                dispatch(changeToHomePage);
                break;
            case ROUTES.LIST_PROBLEM:
                dispatch(changeToListProblem);
                break;
            case ROUTES.DOING:
                dispatch(changeToProblemPage);
                break;
        }
    }

    const routes = [
        {href: "/", title: "Homepage", enum: ROUTES.HOME_PAGE},
        {href: "/problems", title: "Problems", enum: ROUTES.LIST_PROBLEM},
    ]

    return (
        <div className={"w-full flex flex-row justify-center drop-shadow-md bg-white"}>
            <div className={"w-[1152px] flex flex-row justify-between"}>
                <div className={"flex flex-row"}>
                    <Link href={"/"} onClick={() => handleChangePage(ROUTES.HOME_PAGE)}>
                        <img
                            src={ASSET.LOGO.src}
                            alt={"Logo"}
                            className={"w-[30px] mr-3 my-1"}
                        />
                    </Link>
                    {
                        routes.map((route, index) => {
                            return (<NavBarLink
                                key={"NavBarLink" + index}
                                href={route.href}
                                title={route.title}
                                isSelected={page === route.enum}
                                handleChangePage={() => handleChangePage(route.enum)}
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