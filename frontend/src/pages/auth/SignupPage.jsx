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

const formSchema = z
    .object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        email: z.string().email("Enter a valid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

function SignupPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:8080/api/auth/signup",
                {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                },
            );

            // console.log("Signup Success:", res.data);
            Swal.fire({
                title: "Account created successfully!",
                icon: "success",
                draggable: true,
            });

            // alert("");

            navigate("/login");
        } catch (error) {
            console.error("Signup Error:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error?.response?.data?.message || "Signup failed. Try again."}`,
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
                        Create Account
                    </CardTitle>

                    <CardDescription className="text-center">
                        Fill in the details to create your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Name</FieldLabel>

                                        <Input
                                            {...field}
                                            placeholder="Enter your name"
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
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Email</FieldLabel>

                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Enter your email"
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
                                            placeholder="Create password"
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
                                name="confirmPassword"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>
                                            Confirm Password
                                        </FieldLabel>

                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Confirm password"
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
                                {loading ? "Creating Account..." : "Sign Up"}
                            </Button>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <span
                        className="ml-1 cursor-pointer text-primary"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </CardFooter>
            </Card>
        </div>
    );
}

export default SignupPage;
