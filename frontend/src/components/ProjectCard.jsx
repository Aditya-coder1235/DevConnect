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
        <Card className="group flex flex-col transition-shadow hover:shadow-md w-77">
            <CardHeader className="space-y-2 pb-">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-1 text-base font-semibold">
                        {project.title}
                    </CardTitle>

                    <Badge
                        variant="secondary"
                        className="shrink-0 text-[10px] uppercase"
                    >
                        Devs needed
                    </Badge>
                </div>

                <CardDescription className="line-clamp-2">
                    {project.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3 pb-2">
                <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                        <Badge
                            key={tech}
                            variant="outline"
                            className="font-normal"
                        >
                            {tech}
                        </Badge>
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
            </CardContent>
            <CardFooter className="mt-auto border-t border-border/60 bg-muted/30 pt-2">
                <div className="flex w-full items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="size-3.5" />
                        {project.members.length} contributors
                    </span>

                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1"
                        asChild
                    >
                        <Link to={`/dashboard/projectDetail/${project._id}`}>
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
