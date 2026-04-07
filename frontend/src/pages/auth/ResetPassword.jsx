import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const submitHandler = async () => {
        try {
            await axios.post(
                `http://localhost:8080/api/auth/reset-password/${token}`,
                { password },
            );

            Swal.fire({
                icon: "success",
                title: "Password reset successful",
            });

            navigate("/login");
        } catch (error) {
            Swal.fire({
                icon: "error",
                text: error?.response?.data?.message,
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[400px] border p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

                <Input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button className="w-full mt-4" onClick={submitHandler}>
                    Reset Password
                </Button>
            </div>
        </div>
    );
}

export default ResetPassword;
