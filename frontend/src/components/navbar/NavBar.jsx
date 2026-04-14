import { useState, useEffect } from "react";
import { Search, Moon, Sun , Bell} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const [dark, setDark] = useState(false);
    const navigate=useNavigate()

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [dark]);

    return (
        <nav className="sticky top-0 z-50 border-b h-15 w-full bg-background backdrop-blur-md ">
            <div className="mx-auto flex h-15 max-w-7xl w-full  items-center justify-between px-6">
                <div className="relative w-96">
                    {/* <Search
                        className="absolute left-3 top-2.5 opacity-50"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Search projects, people..."
                        className="w-full rounded-md border bg-background py-2 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                    /> */}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDark(!dark)}
                    >
                        {dark ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>

                    <Button variant="ghost" size="icon">
                        <Bell />
                    </Button>
                    <Avatar onClick={()=>navigate('/dashboard/profile')} className={"cursor-pointer"}>
                        <AvatarImage src="https://github.com/evilrabbit.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
