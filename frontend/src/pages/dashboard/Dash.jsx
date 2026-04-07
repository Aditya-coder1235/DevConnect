import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Dash = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const profileCompleted = localStorage.getItem("profile");

        if (profileCompleted === "false") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Complete your Profile first!",
            });
            navigate("/dashboard/profile");
        } else {
            navigate("/dashboard/dash");
        }
    }, [navigate]);

    return (
        <div>
            <h2>hhh</h2>
        </div>
    );
};

export default Dash;
