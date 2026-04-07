import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/AppSidebar";
import NavBar from "@/components/navbar/NavBar";

function DashboardLayout() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AppSidebar />

                <div className="flex flex-col flex-1">
                    <NavBar />

                    <main className="flex-1 p-6 bg-muted/40">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}

export default DashboardLayout;
