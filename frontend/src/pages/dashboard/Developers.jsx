import DeveloperCard from "@/components/DeveloperCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const Developers = () => {
    const [developer, setDeveloper] = useState([]);
    const [allDeveloper, setAllDeveloper] = useState([]);

    const [search, setSearch] = useState("");

    async function fetchProfile() {
        try {
            const res = await axios.get(
                "https://devconnect-1-sl2s.onrender.com/api/user/getAllProfile",
                {
                    withCredentials: true,
                },
            );
            setDeveloper(res.data.allUsers);
            setAllDeveloper(res.data.allUsers);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        let filterUser = allDeveloper.filter((dev) =>
            dev.name.toLowerCase().includes(search.toLowerCase()),
        );

        setDeveloper(filterUser);

    }, [search]);

    // console.log(developer);

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                        Developers
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Find builders by skills and follow their public work.
                    </p>
                </div>
                <Input
                    placeholder="Search by name, handle, or skill…"
                    className="max-w-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {developer.map((developer) => {
                    return (
                        <DeveloperCard
                            key={developer._id}
                            developer={developer}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Developers;
