import { useEffect, useState } from "react";
import { GitBranch, Users } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import Swal from "sweetalert2";

const ProjectDetails = () => {
    const [project, setProject] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    async function fetchProject() {
        try {
            let res = await axios.get(
                `http://localhost:8080/api/project/${id}`,
                {
                    withCredentials: true,
                },
            );
            // console.log(res.data.projects);
            setProject(res.data.project);
            //  navigate("/dashboard/myProjects");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchProject();
    }, []);

    // console.log();
    async function joinProject() {
        try {
            let res = await axios.post(
                `http://localhost:8080/api/project/${id}/join`,
                {},
                {
                    withCredentials: true,
                },
            );

            // console.log(res.data);
            Swal.fire({
                title: "Project join successful!",
                icon: "success",
                draggable: true,
            });

            navigate(`/dashboard/projectDetail/${project._id}`);
        } catch (error) {
            // console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error?.response?.data?.message || "Something went wrong"}`,
            });
        }
    }

    async function leaveProject() {
        try {
            let res = await axios.post(
                `http://localhost:8080/api/project/${id}/leave`,
                {},
                {
                    withCredentials: true,
                },
            );

            // console.log(res.data);
            Swal.fire({
                title: "Project leave successful!",
                icon: "success",
                draggable: true,
            });
            navigate(`/dashboard/projectDetail/${project._id}`);

        } catch (error) {
            // console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error?.response?.data?.message || "Something went wrong"}`,
            });
        }
    }

    async function deleteProject() {
        try {
            let res = await axios.delete(
                `http://localhost:8080/api/project/${id}`,
                {
                    withCredentials: true,
                },
            );

            // console.log(res.data);
            Swal.fire({
                title: "Project delete successful!",
                icon: "success",
                draggable: true,
            });
            navigate(`/dashboard/myProjects`);
        } catch (error) {
            // console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error?.response?.data?.message || "Something went wrong"}`,
            });
        }
    }
    

    let userId = localStorage.getItem("id");

    const isMember = project?.members?.some((member) => member._id === userId);

    const isOwner=project?.owner?._id===userId

    // console.log(isOwner);

    return (
        <div>
            {project && (
                <div className="space-y-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                                    {project.title}
                                </h1>
                                <Badge variant="secondary">
                                    Developers needed
                                </Badge>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {project?.techStack?.map((t) => (
                                    <Badge variant="outline">{t}</Badge>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground pt-2">
                                Status{" "}
                                <span className="text-foreground/80">
                                    {project.status}
                                </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                                TeamSize{" "}
                                <span className="text-foreground/80">
                                    {project.teamSize}
                                </span>
                            </p>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto lg:w-full"
                                onClick={() => joinProject()}
                            >
                                Join project
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                asChild
                                className="w-full sm:w-auto lg:w-full"
                            >
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <GitBranch className="size-4" />
                                    View repo
                                </a>
                            </Button>
                            {isMember && (
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto lg:w-full"
                                    onClick={() => leaveProject()}
                                >
                                    Leave project
                                </Button>
                            )}
                            {isOwner && (
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto lg:w-full bg-red-600"
                                    onClick={() => deleteProject()}
                                >
                                    Delete project
                                </Button>
                            )}
                        </div>
                    </div>

                    <Separator />

                    <div className="grid gap-6 lg:grid-cols-3">
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="text-base">
                                    About
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm text-muted-foreground">
                                {project.description}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Users className="size-4" />
                                    Contributors
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {project?.members &&
                                project?.members?.length > 0 ? (
                                    project.members.map((member) => (
                                        <div
                                            key={member._id || member.email}
                                            className="flex items-center gap-3"
                                        >
                                            <Avatar className="h-9 w-9">
                                                <AvatarFallback>
                                                    {member.name
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium">
                                                    {member.name}
                                                </p>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    @{member.email}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center">
                                        No members yet
                                    </p>
                                )}

                                <Button
                                    variant="outline"
                                    className="w-full mt-3"
                                    asChild
                                >
                                    <Link to="/dashboard/developer">
                                        Invite Developers
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
