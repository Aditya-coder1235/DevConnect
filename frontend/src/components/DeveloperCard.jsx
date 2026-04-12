import { GitBranch, Link2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import axios from "axios";
import Swal from "sweetalert2";

function DeveloperCard({ developer }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const navigate = useNavigate();

    let userid = localStorage.getItem("id");

    useEffect(() => {
        if (developer.followers?.includes(userid)) {
            setIsFollowing(true);
        }
    }, [developer.followers, userid]);

    async function followDev(id) {
        try {
            await axios.post(
                `http://localhost:8080/api/user/follow/${id}`,
                {},
                { withCredentials: true },
            );

            Swal.fire({
                title: "Follow successful!",
                icon: "success",
            });

            setIsFollowing(true);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error?.response?.data?.message || "Something went wrong!"}`,
            });
        }
    }

    async function unFollowDev(id) {
        try {
            await axios.post(
                `http://localhost:8080/api/user/unfollow/${id}`,
                {},
                { withCredentials: true },
            );

            Swal.fire({
                title: "Unfollow successful!",
                icon: "success",
            });

            setIsFollowing(false);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error?.response?.data?.message || "Something went wrong!"}`,
            });
        }
    }

    /* CONNECT BUTTON LOGIC */

    async function startConversation(receiverId) {
        try {
            const res = await axios.post(
                `http://localhost:8080/api/conversation/start/${receiverId}`,
                {},
                { withCredentials: true },
            );

            const conversationId = res.data._id;

            navigate(`/dashboard/message/${conversationId}`);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Chat Error",
                text: "Unable to start conversation",
            });
        }
    }

    return (
        <Card className="flex flex-col transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
                <Avatar className="size-12 border border-border">
                    {developer.avatar ? (
                        <AvatarImage
                            src={developer.avatar}
                            alt={developer.name}
                        />
                    ) : null}

                    <AvatarFallback className="text-sm">
                        {developer.name}
                    </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex justify-between items-start">
                    <div className="flex-1">
                        <CardTitle className="text-base">
                            {developer.name}
                        </CardTitle>

                        <p className="text-sm text-muted-foreground">
                            @{developer.email}
                        </p>
                    </div>

                    {isFollowing && (
                        <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 border border-green-200">
                            Following
                        </span>
                    )}
                </div>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-3 pb-4">
                <CardDescription className="line-clamp-2 text-sm">
                    {developer.bio}
                </CardDescription>

                <div className="flex flex-wrap gap-1.5">
                    {developer.skills?.slice(0, 5).map((skill) => (
                        <Badge
                            key={skill}
                            variant="secondary"
                            className="font-normal"
                        >
                            {skill}
                        </Badge>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="mt-auto flex flex-wrap gap-2 border-t border-border/60 bg-muted/30 pt-4">
                {/* CONNECT BUTTON */}

                <Button
                    size="sm"
                    className="flex-1 sm:flex-none"
                    onClick={() => startConversation(developer._id)}
                >
                    Connect
                </Button>

                {/* FOLLOW */}

                <Button
                    size="sm"
                    variant="ghost"
                    type="button"
                    className="px-2"
                    onClick={() => followDev(developer._id)}
                >
                    Follow
                </Button>

                {/* UNFOLLOW */}

                <Button
                    size="sm"
                    variant="ghost"
                    type="button"
                    className="px-2"
                    onClick={() => unFollowDev(developer._id)}
                >
                    Unfollow
                </Button>

                {/* GITHUB */}

                {developer.github && (
                    <Button
                        size="icon"
                        variant="outline"
                        className="size-8"
                        asChild
                    >
                        <a
                            href={developer.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GitBranch className="size-4" />
                        </a>
                    </Button>
                )}

                {/* PORTFOLIO */}

                {developer.portfolio && (
                    <Button
                        size="icon"
                        variant="outline"
                        className="size-8"
                        asChild
                    >
                        <a
                            href={developer.portfolio}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Link2 className="size-4" />
                        </a>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

export default DeveloperCard;
