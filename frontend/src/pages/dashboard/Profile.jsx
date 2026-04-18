import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const skillOptions = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Prisma",
    "GraphQL",
    "Tailwind",
    "Bootstrap",
    "Material UI",
    "Redux",
    "Zustand",
    "Storybook",
    "Go",
    "Python",
    "Django",
    "Flask",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "Firebase",
    "Supabase",
    "OpenTelemetry",
    "gRPC",
    "WebSocket",
    "Socket.io",
    "CI/CD",
    "Jest",
    "Cypress",
    "React Native",
    "Flutter",
    "Electron",
];

const experienceOptions = ["Beginner", "Intermediate", "Advanced"];

function Profile() {
    const navigate = useNavigate();
    const [info, setInfo] = useState(null);

    const [skills, setSkills] = useState([]);
    const [bio, setBio] = useState("");
    const [github, setGithub] = useState("");
    const [portfolio, setPortfolio] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("Beginner");
    const [avatar, setAvatar] = useState("");

    const toggle = (list, setList, item) => {
        setList(
            list.includes(item)
                ? list.filter((x) => x !== item)
                : [...list, item],
        );
    };

    const handleSubmit = async () => {
        if (!bio || skills.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please fill required fields",
            });
            return;
        }

        try {
            const res = await axios.post(
                "https://devconnect-1-sl2s.onrender.com/api/user/complete",
                {
                    avatar,
                    bio,
                    skills,
                    github,
                    portfolio,
                    experienceLevel,
                },
                {
                    withCredentials: true,
                },
            );

            // localStorage.setItem("profile")
            localStorage.setItem("profile", true);

            await Swal.fire({
                icon: "success",
                title: "Profile Completed",
                text: "Your profile has been saved successfully!",
                timer: 2000,
                showConfirmButton: false,
            });

            navigate("/dashboard/dash");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error?.response?.data?.message || "Something went wrong",
            });
        }
    };

    async function fetchProfile() {
        try {
            const res = await axios.get(
                "https://devconnect-1-sl2s.onrender.com/api/user/getProfile",
                {
                    withCredentials: true,
                },
            );
            setInfo(res.data.user);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    const profile = localStorage.getItem("profile");

    // console.log(profile);
    console.log(info);

    return (
        <div>
            {profile === "true" && info ? (
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <img
                            src={info.avatar}
                            alt="avatar"
                            className="rounded-full border h-24 w-24 object-cover"
                        />
                        <div>
                            <h1 className="text-xl font-bold">{info.name}</h1>
                            <p className="text-muted-foreground">
                                {info.email}
                            </p>
                        </div>
                    </div>

                    <div className="border rounded-lg p-6 space-y-3">
                        <h3 className="text-lg font-semibold">
                            Personal Details
                        </h3>

                        <p>
                            <b>Bio:</b> {info.bio}
                        </p>
                        <p>
                            <b>Skills:</b> {info.skills?.join(", ")}
                        </p>
                        <p>
                            <b>Experience Level:</b> {info.experienceLevel}
                        </p>
                        <p>
                            <b>Github:</b> {info.github}
                        </p>
                        <p>
                            <b>Portfolio:</b> {info.portfolio}
                        </p>
                    </div>
                </div>
            ) : (
                <Card className="min-w-full  mx-auto border-border/80 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">
                            Complete your profile
                        </CardTitle>
                        <CardDescription>
                            Help others understand your skills and experience
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        <div className="space-y-2">
                            <Label>Avatar URL</Label>
                            <Input
                                type="text"
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                                placeholder="https://avatar-link.com/image.png"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Bio</Label>
                            <Textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Write a short introduction..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Skills</Label>

                            <div className="flex flex-wrap gap-2">
                                {skillOptions.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() =>
                                            toggle(skills, setSkills, s)
                                        }
                                    >
                                        <Badge
                                            variant={
                                                skills.includes(s)
                                                    ? "default"
                                                    : "outline"
                                            }
                                        >
                                            {s}
                                        </Badge>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>GitHub</Label>

                                <Input
                                    value={github}
                                    onChange={(e) => setGithub(e.target.value)}
                                    placeholder="https://github.com/username"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Portfolio</Label>

                                <Input
                                    value={portfolio}
                                    onChange={(e) =>
                                        setPortfolio(e.target.value)
                                    }
                                    placeholder="https://portfolio.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Experience Level</Label>

                            <select
                                value={experienceLevel}
                                onChange={(e) =>
                                    setExperienceLevel(e.target.value)
                                }
                                className="flex h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 text-sm"
                            >
                                {experienceOptions.map((o) => (
                                    <option key={o} value={o}>
                                        {o}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Separator />

                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <Button variant="outline" asChild>
                                <Link to="/signup">Back</Link>
                            </Button>

                            <Button onClick={handleSubmit}>
                                Finish & Go to Dashboard
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default Profile;
