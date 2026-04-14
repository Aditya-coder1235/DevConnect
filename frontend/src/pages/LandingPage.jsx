import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { Badge } from "./components/ui/badge";
import {
    Sun,
    Moon,
    Zap,
    ArrowRight,
    Badge,
    Users,
    Rocket,
    MessageSquare,
    Sparkles,
    Icon,
    Earth,
    GitBranch,
    X
} from "lucide-react";

const LandingPage = () => {
    const [dark, setDark] = useState(false);
    const navigate=useNavigate()

    const toggle = () => {
        setDark(!dark);
    };

    const containerClass = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

    const featureItems = [
        {
            icon: Users,
            title: "Find Developers",
            description:
                "Discover builders by stack, experience, and how they like to collaborate.",
        },
        {
            icon: Rocket,
            title: "Post Project Ideas",
            description:
                "Share briefs, roles, and milestones so the right people can raise their hand.",
        },
        {
            icon: MessageSquare,
            title: "Collaborate in Real-Time",
            description:
                "Keep context in one place with messages and activity around each project.",
        },
        {
            icon: Sparkles,
            title: "Build Your Portfolio",
            description:
                "Show contributions and shipped work alongside your profile and links.",
        },
    ];

    return (
        <div className={dark ? "dark" : ""}>
            <div className="min-h-dvh bg-background text-foreground">
                <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
                    <div
                        className={`${containerClass} flex h-16 items-center justify-between`}
                    >
                        <Link to="/" className="flex items-center gap-2">
                            <span className="">
                                <img src="/logo1.png" alt="" className="h-10" />
                            </span>
                            <span className="text-sm font-semibold">
                                DevConnect
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-8">
                            <a
                                href="#features"
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                Features
                            </a>
                            <a
                                href="/signup"
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                Projects
                            </a>
                            <a
                                href="#developers"
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                Developers
                            </a>
                            <a
                                href="#about"
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                About
                            </a>
                        </nav>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggle}
                                aria-label="Toggle theme"
                            >
                                {dark ? (
                                    <Sun className="size-5" />
                                ) : (
                                    <Moon className="size-5" />
                                )}
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                className="hidden sm:inline-flex"
                            >
                                <Link to="/login">Login</Link>
                            </Button>

                            <Button size="sm" asChild>
                                <Link to="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    </div>
                </header>

                <section className="relative overflow-hidden border-b border-border/60">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/30 via-transparent to-cyan-500/30 blur-3xl" />

                    <div
                        className={`relative ${containerClass} py-16 md:py-24`}
                    >
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                                <Zap className="size-3.5 text-primary" />
                                Built for async-first teams
                            </div>

                            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                                Build Projects With Developers Around the World
                            </h1>

                            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                                DevConnect helps you find collaborators, ship
                                meaningful work, and grow your reputation.
                            </p>

                            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="gap-2" asChild>
                                    <Link to="/signup">
                                        Get Started
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </Button>

                                {/* <Button size="lg" variant="outline" asChild>
                                    <Link to="/projects">Explore Projects</Link>
                                </Button> */}
                            </div>
                        </div>

                        <div className="relative mx-auto mt-16 max-w-4xl">
                            <div className="rounded-xl border bg-card p-6 shadow-xl">
                                <div className="flex items-center gap-2 border-b pb-4">
                                    <div className="flex gap-1.5">
                                        <span className="size-3 rounded-full bg-red-400" />
                                        <span className="size-3 rounded-full bg-yellow-400" />
                                        <span className="size-3 rounded-full bg-green-400" />
                                    </div>

                                    <span className="ml-2 text-xs text-muted-foreground">
                                        devconnect.app/dashboard
                                    </span>
                                </div>

                                <div className="grid gap-4 pt-4 sm:grid-cols-3">
                                    {[
                                        { label: "Active collabs", val: "12" },
                                        { label: "Messages", val: "3" },
                                        { label: "Suggestions", val: "8" },
                                    ].map((item) => (
                                        <div
                                            key={item.label}
                                            className="rounded-lg border bg-muted/40 p-4"
                                        >
                                            <p className="text-xs text-muted-foreground">
                                                {item.label}
                                            </p>

                                            <p className="mt-1 text-2xl font-semibold">
                                                {item.val}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <section
                            id="features"
                            className="scroll-mt-20 border-y border-border bg-muted/20 py-20 md:py-24"
                        >
                            <div
                                id=""
                                className="relative mx-auto mt- max-w-4xl"
                            >
                                <h3 className="text-4xl text-center font-bold">
                                    Everything you need to collaborate
                                </h3>
                                <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground text-center">
                                    Opinionated workflows inspired by the best
                                    developer platforms — without the noise.
                                </p>

                                <div className="grid mt-10 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {featureItems.map(
                                        ({
                                            icon: Icon,
                                            title,
                                            description,
                                        }) => (
                                            <div
                                                key={title}
                                                className="border-border/80 bg-card/50 shadow-sm transition-shadow hover:shadow-md p-5 rounded-2xl"
                                            >
                                                <div>
                                                    <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                        <Icon className="size-5" />
                                                    </div>
                                                    <div className="text-lg font-semibold">
                                                        {title}
                                                    </div>
                                                    <div className="text-sm leading-relaxed">
                                                        {description}
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </section>

                        <section
                            id="about"
                            className="scroll-mt-20 border-y border-border bg-muted/20 py-20 md:py-24"
                        >
                            <div className={containerClass}>
                                <div className="mx-auto mb-12 max-w-2xl text-center">
                                    <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                                        How it works
                                    </h2>
                                    <p className="mt-3 text-muted-foreground">
                                        From profile to shipped code in three
                                        clear steps.
                                    </p>
                                </div>
                                <div className="grid gap-8 md:grid-cols-3 md:gap-6">
                                    {[
                                        {
                                            step: "01",
                                            title: "Create Developer Profile",
                                            body: "Show your stack, links, and how you like to work with others.",
                                        },
                                        {
                                            step: "02",
                                            title: "Post or Join Projects",
                                            body: "Publish ideas or browse active collaborations that match your skills.",
                                        },
                                        {
                                            step: "03",
                                            title: "Collaborate and Build Together",
                                            body: "Message, review, and ship with a shared source of truth.",
                                        },
                                    ].map((item, i) => (
                                        <div
                                            key={item.step}
                                            className="relative text-center md:text-left"
                                        >
                                            {i < 2 && (
                                                <div
                                                    className="absolute left-1/2 top-8 hidden h-px w-full bg-gradient-to-r from-border via-primary/40 to-border md:left-[60%] md:block md:w-[calc(100%-2rem)]"
                                                    aria-hidden
                                                />
                                            )}
                                            <span className="inline-flex size-12 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-sm font-bold text-primary">
                                                {item.step}
                                            </span>
                                            <h3 className="mt-6 text-lg font-semibold">
                                                {item.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                {item.body}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section
                            id="developers"
                            className="scroll-mt-20 border-y border-border bg-muted/20 py-20 md:py-24 text-center"
                        >
                            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                                A global developer community
                            </h2>
                            <p className="mt-3 text-muted-foreground">
                                Real momentum across roles, stacks, and time
                                zones.
                            </p>
                            <div className="grid mt-16 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {[
                                    {
                                        num: "1000+",
                                        name: "Developers",
                                    },
                                    {
                                        num: "200+",
                                        name: "Projects",
                                    },
                                    {
                                        num: "50+",
                                        name: "Tech Stacks",
                                    },
                                    {
                                        num: "10+",
                                        name: "Countries",
                                    },
                                ].map((p) => {
                                    return (
                                        <div
                                            key={p.num}
                                            className="bg-card text-foreground border border-border h-30 shadow rounded flex flex-col items-center justify-center gap-2 "
                                        >
                                            <h2 className="text-2xl font-semibold">
                                                {p.num}
                                            </h2>

                                            <p className="text-sm text-muted-foreground">
                                                {p.name}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <Button
                                className={"mt-15 p-3"}
                                onClick={() => navigate("/signup")}
                            >
                                Meet Developers <Earth />
                            </Button>
                        </section>

                        <section className="py-20 md:py-24">
                            <div className={containerClass}>
                                <div className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/20 shadow-lg dark:from-primary/15 dark:via-card dark:to-primary/5">
                                    <div className="flex flex-col items-center px-6 py-14 text-center md:px-12">
                                        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                                            Start Building With Developers Today
                                        </h2>
                                        <p className="mt-4 max-w-lg text-muted-foreground">
                                            Create an account, polish your
                                            profile, and find your next
                                            collaboration in minutes.
                                        </p>
                                        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                                            <Button
                                                size="lg"
                                                className="min-w-[180px]"
                                                asChild
                                            >
                                                <Link to="/signup">
                                                    Join DevConnect
                                                </Link>
                                            </Button>
                                            <Button
                                                size="lg"
                                                variant="outline"
                                                className="min-w-[180px]"
                                                asChild
                                            >
                                                <Link to="/signup">
                                                    Browse Projects
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

                <footer className="border-t border-border bg-muted/30">
                    <div className={`${containerClass} py-12`}>
                        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                            <div className="space-y-4">
                                <Link
                                    to="/"
                                    className="flex items-center gap-2"
                                >
                                    <span className="">
                                        <img
                                            src="/logo1.png"
                                            alt=""
                                            className="h-10"
                                        />
                                    </span>
                                    <span className="font-semibold tracking-tight">
                                        DevConnect
                                    </span>
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                    The collaboration layer for developers who
                                    ship in public.
                                </p>
                            </div>
                            <div>
                                <p className="mb-4 text-sm font-semibold">
                                    Quick links
                                </p>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li>
                                        <a
                                            href="#features"
                                            className="hover:text-foreground"
                                        >
                                            Features
                                        </a>
                                    </li>
                                    <li>
                                        <Link
                                            to="/projects"
                                            className="hover:text-foreground"
                                        >
                                            Browse projects
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/signup"
                                            className="hover:text-foreground"
                                        >
                                            Developers
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/signup"
                                            className="hover:text-foreground"
                                        >
                                            Get started
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p className="mb-4 text-sm font-semibold">
                                    Product
                                </p>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li>
                                        <Link
                                            to="/signup"
                                            className="hover:text-foreground"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/signup"
                                            className="hover:text-foreground"
                                        >
                                            Messages
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/login"
                                            className="hover:text-foreground"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p className="mb-4 text-sm font-semibold">
                                    Social
                                </p>
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="size-10 rounded-full"
                                        asChild
                                    >
                                        <a
                                            href="https://x.com"
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="X"
                                        >
                                            <X className="size-4" />
                                        </a>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="size-10 rounded-full"
                                        asChild
                                    >
                                        <a
                                            href="https://github.com"
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label="GitHub"
                                        >
                                            <GitBranch className="size-4" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <p className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
                            © {new Date().getFullYear()} DevConnect.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default LandingPage;
