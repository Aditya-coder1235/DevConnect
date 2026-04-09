import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import axios from "axios";

const Dash = () => {
    const navigate = useNavigate();
    const[project,setProject]=useState([])

    useEffect(() => {
        const profileCompleted = localStorage.getItem("profile");

        if (profileCompleted === "false") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Complete your Profile first!",
            });
            navigate("/dashboard/profile");
        } else {
            navigate("/dashboard/dash");
        }
    }, [navigate]);


    const hour = new Date().getHours();

    let greeting = "";

    if (hour < 12) {
        greeting = "Morning";
    } else if (hour < 17) {
        greeting = "Afternoon";
    } else if (hour < 21) {
        greeting = "Evening";
    } else {
        greeting = "Night";
    }

    // console.log(`Good ${greeting}`);
     async function fetchProject() {
         try {
             let res = await axios.get(
                 "http://localhost:8080/api/project",
                 { withCredentials: true },
             );

             setProject(res.data.projects);
            //  navigate("/dashboard/myProjects");
         } catch (error) {
             console.log(error)
         }
     }

     useEffect(()=>{
        fetchProject()
     },[])

    return (
        <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="size-3.5 text-primary" />
                Good {greeting} — here&apos;s your workspace pulse
            </div>
            <div className="flex mt-5 items-center">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                    <p className="text-sm opacity-60 mt-2">
                        Discover projects, keep collaborations moving, and grow
                        your network.
                    </p>
                </div>
                <div>
                    <Button
                        onClick={() => navigate("/dashboard/createProject")}
                    >
                        New Project <ArrowRight className="size-4" />
                    </Button>
                </div>
            </div>

            <div className="mt-10 flex justify-between items-center">
                <h2 className="text-[18px] opacity-60">Recommended projects</h2>
                <button
                    onClick={() => navigate("/dashboard/projects")}
                    className="text-sm hover:bg-gray-300 p-1 rounded transition"
                >
                    Browse all
                </button>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {project.slice(0, 3).map((project) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        </div>
    );
};

export default Dash;
