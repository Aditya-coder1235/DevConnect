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

import { Input } from "@/components/ui/input";
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
} from "lucide-react";

import Swal from "sweetalert2";

function AppSidebar() {
    const navigate = useNavigate();


    const logoutUser = async () => {
        try {
            await axios.post(
                "https://devconnect-1-sl2s.onrender.com/api/auth/logout",
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
            const res = await axios.delete(
                "https://devconnect-1-sl2s.onrender.com/api/user/delete",
                {
                    withCredentials: true,
                },
            );

            console.log(res.data);

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

    return (
        <>
            <Sidebar>
                <div className="flex items-center gap-2 px-4 py-4 border-b">
                    <Code className="w-6 h-6 text-primary" />
                    <span className="font-semibold text-lg">DevConnect</span>
                </div>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Main</SidebarGroupLabel>

                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/dashboard/dash">
                                        <Home />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/dashboard/projects">
                                        <Search />
                                        <span>Projects</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/dashboard/myProjects">
                                        <Folder />
                                        <span>My Projects</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/dashboard/message">
                                        <MessageCircle />
                                        <span>Messages</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/dashboard/developer">
                                        <User />
                                        <span>Developers</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>

                    <SidebarGroup>
                        <SidebarGroupLabel>Settings</SidebarGroupLabel>

                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/dashboard/profile">
                                        <User />
                                        <span>Profile</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <SidebarMenuButton>
                                            <Settings />
                                            <span>Settings</span>
                                        </SidebarMenuButton>
                                    </DialogTrigger>

                                    <DialogContent className="sm:max-w-[400px]">
                                        <DialogHeader>
                                            <DialogTitle>Settings</DialogTitle>
                                        </DialogHeader>

                                        <div className="flex flex-col gap-3 mt-4">
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    navigate(
                                                        "/dashboard/updateProfile",
                                                    )
                                                }
                                            >
                                                Update Profile
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                onClick={() => deleteAccount()}
                                            >
                                                Delete Account
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                className="cursor-pointer"
                                onClick={logoutUser}
                            >
                                <LogOut />
                                <span>Logout</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </>
    );
}

export default AppSidebar;
