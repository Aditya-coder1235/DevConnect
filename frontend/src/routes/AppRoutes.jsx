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
import MessagesList from "@/pages/dashboard/MessagesList";
import Projects from "@/pages/dashboard/Projects";
import MyProjects from "@/pages/dashboard/MyProjects";
import Profile from "@/pages/dashboard/Profile";
import Setting from "@/pages/dashboard/Setting";
import UpdateProfile from "@/pages/dashboard/UpdateProfile";
import CreateProject from "@/pages/dashboard/CreateProject";
import ProjectDetails from "@/pages/dashboard/ProjectDetails";
import NotFound from "@/components/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                {/* <Route index element={<Index />} /> */}
                <Route index path="dash" element={<Dash />} />
                <Route index path="developer" element={<Developers />} />
                <Route
                    index
                    path="message/:conversationId"
                    element={<Messages />}
                />
                <Route index path="projects" element={<Projects />} />
                <Route index path="myProjects" element={<MyProjects />} />
                <Route index path="profile" element={<Profile />} />
                <Route index path="updateProfile" element={<UpdateProfile />} />
                <Route index path="createProject" element={<CreateProject />} />
                <Route index path="message" element={<MessagesList />} />
                <Route
                    index
                    path="projectDetail/:id"
                    element={<ProjectDetails />}
                />

                <Route index path="settings" element={<Setting />} />
            </Route>

            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    );
};

export default AppRoutes;
