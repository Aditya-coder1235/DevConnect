import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

const formSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const res = await axios.post(
                "https://devconnect-1-sl2s.onrender.com/api/auth/login",
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    withCredentials: true,
                },
            );
            // console.log();

            localStorage.setItem("name", res.data.user.name);
            localStorage.setItem("id", res.data.user.id);
            localStorage.setItem("profile", res.data.user.profileComplete);


            // alert("");
            Swal.fire({
                title: "Login successful!",
                icon: "success",
                draggable: true,
            });

            navigate("/dashboard/dash");
        } catch (error) {
            console.error("Login Error:", error);

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error?.response?.data?.message || "Invalid email or password"}`,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-muted/40 px-4">
            <Card className="w-full sm:max-w-md shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">
                        Login
                    </CardTitle>

                    <CardDescription className="text-center">
                        Enter your email and password to login
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Email</FieldLabel>

                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Enter your email"
                                            autoComplete="off"
                                        />

                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Password</FieldLabel>

                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Enter your password"
                                        />

                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                        

                        <div className="mt-4">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <span
                        className="ml-1 cursor-pointer text-primary"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </CardFooter>
            </Card>
        </div>
    );
}

export default LoginPage;
