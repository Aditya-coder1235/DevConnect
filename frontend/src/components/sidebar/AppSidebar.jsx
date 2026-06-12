import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import {
    Home,
    Folder,
    User,
    Settings,
    LogOut,
    Code,
    Search,
    MessageCircle,
    Menu,
} from "lucide-react";

import Swal from "sweetalert2";

function SidebarNav({ onNavigate }) {
    const navigate = useNavigate();

    const logoutUser = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/logout`,
                {},
                { withCredentials: true },
            );
            localStorage.removeItem("name");
            localStorage.removeItem("id");
            navigate("/login");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const deleteAccount = async () => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/user/delete`,
                { withCredentials: true },
            );
            localStorage.removeItem("name");
            localStorage.removeItem("id");
            localStorage.removeItem("profile");
            await Swal.fire({
                icon: "success",
                title: "Account Deleted!",
                text: "Your account has been deleted successfully",
                timer: 2000,
                showConfirmButton: false,
            });
            navigate("/signup");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error?.response?.data?.message || "Something went wrong",
            });
        }
    };

    const mainLinks = [
        { to: "/dashboard/dash", icon: <Home size={18} />, label: "Dashboard" },
        {
            to: "/dashboard/projects",
            icon: <Search size={18} />,
            label: "Projects",
        },
        {
            to: "/dashboard/myProjects",
            icon: <Folder size={18} />,
            label: "My Projects",
        },
        {
            to: "/dashboard/message",
            icon: <MessageCircle size={18} />,
            label: "Messages",
        },
        {
            to: "/dashboard/developer",
            icon: <User size={18} />,
            label: "Developers",
        },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 px-4 py-4 border-b">
                <Code className="w-6 h-6 text-primary" />
                <span className="font-semibold text-lg">DevConnect</span>
            </div>

            <div className="flex-1 px-2 py-4 space-y-1">
                <p className="text-xs text-muted-foreground px-2 mb-2">Main</p>
                {mainLinks.map(({ to, icon, label }) => (
                    <Link
                        key={to}
                        to={to}
                        onClick={onNavigate}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
                    >
                        {icon}
                        <span>{label}</span>
                    </Link>
                ))}

                <p className="text-xs text-muted-foreground px-2 mt-4 mb-2">
                    Settings
                </p>
                <Link
                    to="/dashboard/profile"
                    onClick={onNavigate}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
                >
                    <User size={18} />
                    <span>Profile</span>
                </Link>

                <Dialog>
                    <DialogTrigger asChild>
                        <button className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors">
                            <Settings size={18} />
                            <span>Settings</span>
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[400px]">
                        <DialogHeader>
                            <DialogTitle>Settings</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-3 mt-4">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    navigate("/dashboard/updateProfile");
                                    onNavigate?.();
                                }}
                            >
                                Update Profile
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={deleteAccount}
                            >
                                Delete Account
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border-t px-2 py-3">
                <button
                    onClick={logoutUser}
                    className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}

function AppSidebar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <div className="hidden lg:block">
                <Sidebar>
                    <SidebarNav />
                </Sidebar>
            </div>

            <div className="lg:hidden">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="fixed top-3.5 left-4 z-50"
                            aria-label="Open menu"
                        >
                            <Menu size={22} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <SidebarNav onNavigate={() => setMobileOpen(false)} />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}

export default AppSidebar;
