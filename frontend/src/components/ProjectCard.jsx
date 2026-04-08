import { ArrowUpRight, Users } from "lucide-react";
import { Link } from "react-router-dom";

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

function ProjectCard({ project }) {
    return (
        <Card className="group flex flex-col transition-shadow hover:shadow-md">
            <CardHeader className="space-y-2 pb-3">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-1 text-base font-semibold">
                        {/* {project.title} */}
                        title
                    </CardTitle>

                    {/* {project.seeking && ( */}
                    <Badge
                        variant="secondary"
                        className="shrink-0 text-[10px] uppercase"
                    >
                        Devs needed
                    </Badge>
                    {/* // )} */}
                </div>

                <CardDescription className="line-clamp-2">
                    {/* {project.description} */}
                    description
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-3 pb-4">
                <div className="flex flex-wrap gap-1.5">
                    {/* {project.stack.map((tech) => ( */}
                    <Badge
                        // key={tech}
                        variant="outline"
                        className="font-normal"
                    >
                        {/* {tech} */}
                        tech
                    </Badge>
                    {/* ))} */}
                </div>

                {/* {project.rolesNeeded && project.rolesNeeded.length > 0 && ( */}
                <p className="text-xs text-muted-foreground">
                    Roles{" "}
                    <span className="text-foreground/80">
                        {/* {project.rolesNeeded.join(" · ")} */}
                        roles needed
                    </span>
                </p>
                {/* )} */}
            </CardContent>

            <CardFooter className="mt-auto border-t border-border/60 bg-muted/30 pt-4">
                <div className="flex w-full items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="size-3.5" />
                        {/* {project.contributorCount} contributors */}
                        contributors
                    </span>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1"
                        asChild
                    >
                        <Link >
                            View
                            <ArrowUpRight className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100" />
                        </Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default ProjectCard
