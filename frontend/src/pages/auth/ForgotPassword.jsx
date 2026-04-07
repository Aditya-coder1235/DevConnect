import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const submitHandler = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8080/api/auth/forgot-password",
                { email },
            );

            Swal.fire({
                icon: "success",
                title: "Reset link generated",
                text: res.data.resetLink,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error?.response?.data?.message,
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[400px] border p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>

                <Input
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Button className="w-full mt-4" onClick={submitHandler}>
                    Send Reset Link
                </Button>
            </div>
        </div>
    );
}

export default ForgotPassword;
