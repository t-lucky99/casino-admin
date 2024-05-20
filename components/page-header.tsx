"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaBars, FaBell } from "react-icons/fa6";
import { useState } from "react";

export const Header = () => {
    const [showNav, setShowNav] = useState(false);
    const handleClickBar = () => {
        const mainNav = document.querySelector('#mainNav');

        setShowNav(!showNav);

        if(showNav && mainNav?.classList.contains("w-0")) {
            mainNav?.classList.add("w-[230px]");
            mainNav.classList.remove("w-0");
        }
        if(showNav && mainNav?.classList.contains("overflow-hidden")) {
            mainNav.classList.remove("overflow-hidden");
        }

        if(!showNav) {
            mainNav?.classList.remove('w-[230px]');
            mainNav?.classList.add("w-0");
            mainNav?.classList.add("overflow-hidden");
        }
    }

    return (
        <div className="w-full flex p-5 justify-between shadow">
            <div className="container mx-auto md:flex md:justify-between">
                <div className="btn-burger" onClick={handleClickBar}>
                    <FaBars size={20} />
                </div>
     
                <div className="w-[110px] flex justify-between align-middle">
                    <div>
                        <FaBell size={26} className="my-2" />
                    </div>
                    
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CA</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
};

