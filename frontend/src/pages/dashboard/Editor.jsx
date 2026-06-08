import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import MonacoEditor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Check } from "lucide-react";

function Editor() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const providerRef = useRef(null);
    const bindingRef = useRef(null);

    const [connected, setConnected] = useState(false);
    const [language, setLanguage] = useState("javascript");

    const languages = [
        "javascript",
        "typescript",
        "python",
        "java",
        "cpp",
        "html",
        "css",
    ];

    function handleEditorMount(editor) {
        editorRef.current = editor;

        const ydoc = new Y.Doc();

        const wsUrl = import.meta.env.VITE_API_URL.replace(
            "http://",
            "ws://",
        ).replace("https://", "wss://");

        const provider = new WebsocketProvider(wsUrl, roomId, ydoc);

        providerRef.current = provider;

        provider.on("status", (event) => {
            setConnected(event.status === "connected");
        });

        const ytext = ydoc.getText("monaco");
        const binding = new MonacoBinding(
            ytext,
            editor.getModel(),
            new Set([editor]),
            provider.awareness,
        );

        bindingRef.current = binding;
    }

    useEffect(() => {
        return () => {
            bindingRef.current?.destroy();
            providerRef.current?.destroy();
        };
    }, []);

    return (
        <div className="flex flex-col h-screen bg-background">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
                <div className="flex items-center gap-3">
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate("/dashboard/dash")}
                    >
                        <ArrowLeft className="size-4 mr-1" />
                        Back
                    </Button>

                    <span className="text-sm font-medium">
                        Live Code Session
                    </span>

                    <div className="flex items-center gap-1.5">
                        <div
                            className={`size-2 rounded-full ${connected ? "bg-green-500" : "bg-yellow-500"}`}
                        />
                        <span className="text-xs text-muted-foreground">
                            {connected ? "Connected" : "Connecting..."}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="text-xs border border-border rounded px-2 py-1 bg-background"
                    >
                        {languages.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1">
                <MonacoEditor
                    height="100%"
                    language={language}
                    theme="vs-dark"
                    defaultValue="// Start coding together..."
                    onMount={handleEditorMount}
                    options={{
                        fontSize: 14,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                        automaticLayout: true,
                    }}
                />
            </div>
        </div>
    );
}

export default Editor;
