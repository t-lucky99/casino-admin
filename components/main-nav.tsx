import { FaDice, FaListUl, FaGamepad } from "react-icons/fa";
import Link from "next/link";

export const MainNav = () => {
    return (
        <div id="mainNav" className="w-[230px] py-10 transition-all">
            <div className="nav-menu-link">
                <FaDice size={32}/>
                <Link href="/games" className="w-full">Games</Link>
            </div>
            <div className="nav-menu-link">
                <FaListUl size={22}/>
                <Link href="/games-types" className="w-full">Game Types</Link>
            </div>
            <div className="nav-menu-link">
                <FaGamepad size={30}/>
                <Link href="/games-types" className="w-full">Providers</Link>
            </div>
        </div>
    );
};