import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const Projects = () => {
    const [project, setProject] = useState([]);
    async function fetchProject() {
        try {
            let res = await axios.get("http://localhost:8080/api/project", {
                withCredentials: true,
            });

            setProject(res.data.projects);
            //  navigate("/dashboard/myProjects");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProject();
    }, []);


  let allStackTags = [
      "React",
      "TypeScript",
      "Tailwind",
      "Storybook",
      "Go",
      "Redis",
      "OpenTelemetry",
      "gRPC",
  ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                        Browse projects
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Filter by stack, explore roles, and find your next
                        collaboration.
                    </p>
                </div>
                <div>
                  <Input type="text" placeholder="Search by title..." className={"w-80"}/>
                </div>
            </div>

            <div className="mt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Filter by tech stack
                </p>
                <div className="flex flex-wrap gap-2">
                    <button type="button">
                        <Badge>All</Badge>
                    </button>
                    {allStackTags.map((tag) => (
                        <button key={tag} type="button">
                            <Badge>{tag}</Badge>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {project.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default Projects;
