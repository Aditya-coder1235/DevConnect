import { useEffect, useState } from "react";
import axios from "axios";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { Send } from "lucide-react";

const MessagesPage = () => {
    const [threads, setThreads] = useState([]);
    const [activeThreadId, setActiveThreadId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [draft, setDraft] = useState("");

    const userId = localStorage.getItem("id");

    /* ---------------- GET CONVERSATIONS ---------------- */

    useEffect(() => {
        async function fetchConversations() {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/conversation/${userId}`,
                    { withCredentials: true },
                );

                const formatted = res.data.map((conv) => {
                    const friend = conv.members.find((m) => m._id !== userId);

                    return {
                        id: conv._id,
                        name: friend?.name || "Developer",
                        handle: friend?.email || "user",
                        avatar: friend?.avatar,
                    };
                });

                setThreads(formatted);

                if (formatted.length > 0) {
                    setActiveThreadId(formatted[0].id);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchConversations();
    }, [userId]);

    /* ---------------- GET MESSAGES ---------------- */

    useEffect(() => {
        if (!activeThreadId) return;

        async function fetchMessages() {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/message/${activeThreadId}`,
                    { withCredentials: true },
                );

                const formatted = res.data.map((msg) => ({
                    id: msg._id,
                    body: msg.text,
                    author: msg.sender === userId ? "me" : "other",
                    time: new Date(msg.createdAt).toLocaleTimeString(),
                }));

                setMessages(formatted);
            } catch (error) {
                console.log(error);
            }
        }

        fetchMessages();
    }, [activeThreadId, userId]);

    /* ---------------- SELECT THREAD ---------------- */

    function onSelectThread(id) {
        setActiveThreadId(id);
    }

    const active = threads.find((t) => t.id === activeThreadId);

    /* ---------------- SEND MESSAGE ---------------- */

    async function sendMessage() {
        if (!draft.trim()) return;

        try {
            const res = await axios.post(
                "http://localhost:8080/api/message",
                {
                    conversationId: activeThreadId,
                    text: draft,
                },
                { withCredentials: true },
            );

            setMessages((prev) => [
                ...prev,
                {
                    id: res.data._id,
                    body: res.data.text,
                    author: "me",
                    time: new Date().toLocaleTimeString(),
                },
            ]);

            setDraft("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex h-[min(640px,calc(100dvh-12rem))] min-h-[420px] overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            {/* ---------------- LEFT SIDEBAR ---------------- */}

            <aside className="hidden min-h-0 w-72 shrink-0 flex-col border-r border-border md:flex">
                <div className="border-b border-border px-4 py-3">
                    <p className="text-sm font-semibold">Conversations</p>
                    <p className="text-xs text-muted-foreground">
                        Direct messages
                    </p>
                </div>

                <ScrollArea className="min-h-0 flex-1">
                    <div className="p-2">
                        {threads.map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => onSelectThread(t.id)}
                                className={`mb-1 flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted/80 ${
                                    t.id === activeThreadId ? "bg-muted" : ""
                                }`}
                            >
                                <Avatar className="size-9">
                                    <AvatarImage src={t.avatar} />
                                    <AvatarFallback className="text-xs">
                                        {t.name
                                            ?.split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="truncate font-medium">
                                            {t.name}
                                        </span>
                                    </div>

                                    <p className="truncate text-xs text-muted-foreground">
                                        @{t.handle}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </aside>

            {/* ---------------- RIGHT CHAT AREA ---------------- */}

            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                {/* CHAT HEADER */}

                <header className="flex items-center gap-3 border-b border-border px-4 py-3">
                    <Avatar className="size-9">
                        <AvatarImage src={active?.avatar} />
                        <AvatarFallback>
                            {active?.name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2) ?? "—"}
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                            {active?.name ?? "Select conversation"}
                        </p>

                        {active && (
                            <p className="truncate text-xs text-muted-foreground">
                                @{active.handle}
                            </p>
                        )}
                    </div>
                </header>

                {/* MESSAGES */}

                <ScrollArea className="min-h-0 flex-1 p-4">
                    <div className="space-y-4">
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={`flex ${
                                    m.author === "me"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                                        m.author === "me"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-foreground"
                                    }`}
                                >
                                    <p>{m.body}</p>

                                    <p
                                        className={`mt-1 text-[10px] ${
                                            m.author === "me"
                                                ? "text-primary-foreground/70"
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        {m.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <Separator />

                {/* MESSAGE INPUT */}

                <div className="flex items-center gap-2 p-3">
                    <Input
                        placeholder="Message..."
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        className="flex-1"
                    />

                    <Button
                        type="button"
                        size="icon"
                        className="shrink-0"
                        onClick={sendMessage}
                    >
                        <Send className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;
