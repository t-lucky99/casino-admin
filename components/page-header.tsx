import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export const Header = () => {
    return (
        <div className="w-full flex p-5 justify-between shadow">
            <div className="container mx-auto md:flex md:justify-between">
                
                <div className="btn-burger">
                    <HamburgerMenuIcon /> 
                </div>
                
                
                <div className="w-[290px] flex justify-between">
                    <Input className="w-[230px]" placeholder="Search" />

                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CA</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>
    );
};

