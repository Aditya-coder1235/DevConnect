import React from "react";
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
    Home,
    Folder,
    User,
    Settings,
    LogOut,
    Code,
    Search,
    MessageCircle,
    CircleAlert,
} from "lucide-react";

function AppSidebar() {
    const navigate=useNavigate()

    const logoutUser = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8080/api/auth/logout",
                {},
                {
                    withCredentials: true,
                },
            );
            console.log(res.data)

            localStorage.removeItem("name");
            localStorage.removeItem("id");

            

            navigate("/login");
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    return (
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
                                <Link to="/dashboard/projects">
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

                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to="/dashboard/notification">
                                    <CircleAlert />
                                    <span>Notification</span>
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
                            <SidebarMenuButton asChild>
                                <Link to="/dashboard/settings">
                                    <Settings />
                                    <span>Settings</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className={"cursor-pointer"}>
                            <LogOut />
                            <span>
                                <button onClick={() => logoutUser()}>
                                    Logout
                                </button>
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSidebar;
