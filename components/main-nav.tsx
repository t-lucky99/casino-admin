import { RocketIcon, TargetIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const MainNav = () => {
    return (
        <div className="w-[230px] py-10">
            <div className="nav-menu-link">
                <RocketIcon className="" />
                <Link href="/games" className="w-full">Games</Link>
            </div>
            <div className="nav-menu-link">
                <TargetIcon />
                <Link href="/games-types" className="w-full">Game Types</Link>
            </div>
            <div className="nav-menu-link">
                <LightningBoltIcon />
                <Link href="/games-types" className="w-full">Providers</Link>
            </div>
        </div>
    );
};