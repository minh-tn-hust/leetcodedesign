import Link from "next/link";
import ASSET from "@/shared/assets";
import NavBarLink from "@/shared/navbar/components/NavBarLink";
import {
    changeToAuthenPage,
    changeToHomePage,
    changeToListProblem,
    changeToProblemPage,
    ROUTES
} from "@/reducers/appRoutes/appRoutesReducer";
import {useDispatch, useSelector} from "react-redux";
import {currentRoutes} from "@/reducers/appRoutes/appRoutesSelector";
import {currentRole, getAuthenRole, getUsername} from "@/reducers/authentication/authenticationSelector";
import {ROLE} from "@/constants/role";

export default function NavBar(props) {
    const page = useSelector(currentRoutes);
    const role = useSelector(currentRole);
    const username = useSelector(getUsername);
    const authenState = useSelector(getAuthenRole);
    const dispatch = useDispatch();

    const displayWithAuthenState = function() {
        if (authenState === ROLE.NON_AUTHORIZE) {
            return <NavBarLink
                href={loginPage.href}
                title={loginPage.title}
                isSelected={page === loginPage.enum}
                handleChangePage={() => handleChangePage(loginPage.enum)}
            />
        } else {
            const display = <div>Welcome, <b>{username}</b></div>
            return <NavBarLink
                href={"#"}
                title={display}
                isSelected={false}
                handleChangePage={() => {}}
            />
        }

    }

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

            case ROUTES.AUTHEN:
                dispatch(changeToAuthenPage);
                break;

            default:
                console.error("Unknown route: " + toPage);
        }
    }

    const routes = [
        {href: "/", title: "Homepage", enum: ROUTES.HOME_PAGE},
        {href: "/problems", title: "Problems", enum: ROUTES.LIST_PROBLEM},
        {href: "/authentication", title: "Sign In", enum: ROUTES.AUTHEN},
        {href: "/admin", title: "Admin", enum: ROUTES.ADMIN}
    ]

    const loginPage = routes[2];
    const adminPage = routes[3];

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
                            if (index > 1) {
                                return;
                            }
                            return (<NavBarLink
                                key={"NavBarLink" + index}
                                href={route.href}
                                title={route.title}
                                isSelected={page === route.enum}
                                handleChangePage={() => handleChangePage(route.enum)}
                            />)
                        })
                    }
                    {
                        (role === ROLE.ADMIN || page === adminPage.enum) ?
                        <NavBarLink
                            key={"NavBarLink_ADMIN"}
                            href={adminPage.href}
                            title={adminPage.title}
                            isSelected={page === adminPage.enum}
                            handleChangePage={() => handleChangePage(adminPage.enum)}
                        /> : <></>
                    }
                </div>
                {
                    displayWithAuthenState()
                }
            </div>
        </div>
    );
}