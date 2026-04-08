import { Link, useNavigate } from "react-router-dom";
import {useState } from "react";
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
    "TypeScript",
    "Node",
    "Go",
    "Design",
    "DevOps",
    "ML",
    "Product",
];

const experienceOptions = ["Beginner", "Intermediate", "Advanced"];

const UpdateProfile = () => {
    const navigate = useNavigate();

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
         

         try {
             const res = await axios.put(
                 "http://localhost:8080/api/user/update",
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
            //  localStorage.setItem("profile", true);
            console.log(res.data)

             await Swal.fire({
                 icon: "success",
                 title: "Profile Updated",
                 text: "Your profile has been update successfully!",
                 timer: 2000,
                 showConfirmButton: false,
             });

             navigate("/dashboard/profile");
         } catch (error) {
             Swal.fire({
                 icon: "error",
                 title: "Error",
                 text: error?.response?.data?.message || "Something went wrong",
             });
         }
     };
  return (
      <div>
          <Card className="min-w-fulll  mx-auto border-border/80 shadow-lg">
              <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                      Update your profile
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
                                  onClick={() => toggle(skills, setSkills, s)}
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
                              onChange={(e) => setPortfolio(e.target.value)}
                              placeholder="https://portfolio.com"
                          />
                      </div>
                  </div>

                  <div className="space-y-2">
                      <Label>Experience Level</Label>

                      <select
                          value={experienceLevel}
                          onChange={(e) => setExperienceLevel(e.target.value)}
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
                      

                      <Button onClick={handleSubmit}>
                         Update Profile
                      </Button>
                  </div>
              </CardContent>
          </Card>
      </div>
  );
}

export default UpdateProfile
