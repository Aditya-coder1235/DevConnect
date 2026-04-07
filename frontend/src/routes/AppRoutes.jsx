import React from "react";
import { Route, Routes } from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";
import SignupPage from "@/pages/auth/SignupPage";
import LoginPage from "@/pages/auth/LoginPage";
import LandingPage from "@/pages/LandingPage";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";

// import Index from "@/pages/Index";
import Dash from "@/pages/dashboard/Dash";
import Developers from "@/pages/dashboard/Developers";
import Messages from "@/pages/dashboard/Messages";
import Projects from "@/pages/dashboard/Projects";
import MyProjects from "@/pages/dashboard/MyProjects";
import Profile from "@/pages/dashboard/Profile";
import Setting from "@/pages/dashboard/Setting";
import Notification from "@/pages/dashboard/Notification";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
                {/* <Route index element={<Index />} /> */}
                <Route index path="dash" element={<Dash />} />
                <Route index path="developer" element={<Developers />} />
                <Route index path="message" element={<Messages />} />
                <Route index path="projects" element={<Projects />} />
                <Route index path="projects" element={<MyProjects />} />
                <Route index path="profile" element={<Profile />} />
                <Route index path="notification" element={<Notification />} />

                <Route index path="settings" element={<Setting />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
