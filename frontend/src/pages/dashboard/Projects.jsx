import { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const Projects = () => {
    const [project, setProject] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
const [selectedStack, setSelectedStack] = useState("");
    const [search, setsearch] = useState("");

    async function fetchProject() {
        try {
            let res = await axios.get("http://localhost:8080/api/project", {
                withCredentials: true,
            });

            setProject(res.data.projects);
            setAllProjects(res.data.projects);
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

    // console.log(project.techStack);

    useEffect(() => {
        let filtered = allProjects.filter((project) => {
            const matchTitle = project.title
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchStack =
                selectedStack === "" ||
                project.techStack?.includes(selectedStack);

            return matchTitle && matchStack;
        });

        setProject(filtered);
    }, [search, selectedStack, allProjects]);

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
                    <Input
                        type="text"
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        placeholder="Search by title..."
                        className={"w-80"}
                    />
                </div>
            </div>

            <div className="mt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Filter by tech stack
                </p>
                <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => setSelectedStack("")}>
                        <Badge
                            variant={
                                selectedStack === "" ? "default" : "outline"
                            }
                        >
                            All
                        </Badge>
                    </button>
                    {allStackTags.map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => setSelectedStack(tag)}
                        >
                            <Badge
                                variant={
                                    selectedStack === tag
                                        ? "default"
                                        : "outline"
                                }
                            >
                                {tag}
                            </Badge>
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
