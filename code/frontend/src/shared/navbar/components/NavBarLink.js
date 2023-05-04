import Link from "next/link";

export default function NavBarLink({href, title, isSelected, handleChangePage,...props}) {
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
