import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const stackChoices = [
    "React",
    "TypeScript",
    "Vite",
    "Tailwind",
    "Node",
    "Go",
    "PostgreSQL",
    "Redis",
];

function CreateProject() {
    const navigate=useNavigate()

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [teamSize, setTeamSize] = useState(1);
    const [status, setStatus] = useState("open");
    const [techStack, setTechStack] = useState(["React"]);
    const [githubLink, setGithubLink]=useState("")

    const toggleStack = (item) => {
        if (techStack.includes(item)) {
            setTechStack(techStack.filter((x) => x !== item));
        } else {
            setTechStack([...techStack, item]);
        }
    };

    async function createProject() {
        try {
            let res = await axios.post(
                "http://localhost:8080/api/project/create",
                { title, description, teamSize, status, techStack, githubLink },
                { withCredentials: true },
            );

            Swal.fire({
                title: "Project create successful!",
                icon: "success",
                draggable: true,
            });

            console.log(res.data);
            navigate("/dashboard/myProjects");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error?.response?.data?.message || "Something went wrong!"}`,
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createProject();
    };

    return (
        <div className="min-w-fulll  mx-auto border-border/80 -lg">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    Create project
                </h1>
                <p className="mt-1 text-muted-foreground">
                    Publish a collaboration brief.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Project details</CardTitle>
                    <CardDescription>
                        Clear titles and stacks help developers discover your
                        project.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                                placeholder="Open telemetry dashboard"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                rows={5}
                                placeholder="Describe your project..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Team Size</Label>
                            <Input
                                type="number"
                                min="1"
                                value={teamSize}
                                onChange={(e) => setTeamSize(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Github Link</Label>
                            <Input
                                placeholder="write your github repo link"
                                value={githubLink}
                                onChange={(e) => setGithubLink(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Status</Label>
                            <select
                                className="w-full rounded-md border p-2"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label>Tech Stack</Label>
                            <div className="flex flex-wrap gap-2">
                                {stackChoices.map((stack) => (
                                    <button
                                        key={stack}
                                        type="button"
                                        onClick={() => toggleStack(stack)}
                                        className="rounded-md"
                                    >
                                        <Badge
                                            variant={
                                                techStack.includes(stack)
                                                    ? "default"
                                                    : "outline"
                                            }
                                        >
                                            {stack}
                                        </Badge>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <Button variant="outline" asChild>
                                <Link to="/projects">Cancel</Link>
                            </Button>

                            <Button type="submit">Publish project</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default CreateProject;
