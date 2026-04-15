import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const userId = localStorage.getItem("id");

    if (!userId) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
