import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MyProjects = () => {
    const [project, setProject] = useState([]);

    async function fetchProject() {
        try {
            let res = await axios.get(
                "https://devconnect-1-sl2s.onrender.com/api/project/owner",
                {
                    withCredentials: true,
                },
            );
            // console.log(res.data.projects);
            setProject(res.data.projects);
            //  navigate("/dashboard/myProjects");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
      fetchProject()
    },[])
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                        My projects
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Projects you own or actively contribute 
                    </p>
                </div>
                <Button asChild>
                    <Link to="/dashboard/createProject">New project</Link>
                </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                ))}
            </div>
        </div>
    );
};

export default MyProjects;
