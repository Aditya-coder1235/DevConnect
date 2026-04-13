import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const Messages = () => {
    const { conversationId } = useParams();

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");

    const userId = localStorage.getItem("id");

    const scrollRef = useRef();

    

    useEffect(() => {
        async function getMessages() {
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/message/${conversationId}`,
                    { withCredentials: true },
                );

                setMessages(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        getMessages();
    }, [conversationId]);

  

    useEffect(() => {
        socket.emit("addUser", userId);

        socket.on("getMessage", (data) => {
            setMessages((prev) => [
                ...prev,
                {
                    sender: data.senderId,
                    text: data.text,
                    conversationId,
                },
            ]);
        });

        return () => socket.off("getMessage");
    }, [userId, conversationId]);

   
    async function sendMessage() {
        if (!text) return;

        try {
            const res = await axios.post(
                "http://localhost:8080/api/message",
                {
                    conversationId,
                    text,
                },
                { withCredentials: true },
            );

            const newMessage = res.data;

            setMessages((prev) => [...prev, newMessage]);

            const receiverId = newMessage.conversationId.members.find(
                (m) => m._id !== userId,
            )._id;

            socket.emit("sendMessage", {
                senderId: userId,
                receiverId,
                text,
            });

            setText("");
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

  

    const conversation = messages[0]?.conversationId;

    const friend = conversation?.members?.find((m) => m._id !== userId);

    const me = conversation?.members?.find((m) => m._id === userId);

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-background rounded-xl border shadow-sm overflow-hidden">
            {/* HEADER */}

            <div className="flex items-center gap-3 px-5 py-4 border-b bg-muted/40">
                <img
                    src={friend?.avatar || "https://i.pravatar.cc/150"}
                    className="w-9 h-9 rounded-full object-cover"
                />

                <div>
                    <p className="font-semibold text-sm">
                        {friend?.name || "Developer"}
                    </p>

                    <p className="text-xs text-gray-500">{friend?.email}</p>
                </div>
            </div>

            {/* MESSAGES */}

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-muted/20">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        ref={scrollRef}
                        className={`flex items-end gap-2 ${
                            msg.sender === userId
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        {/* FRIEND AVATAR */}

                        {msg.sender !== userId && (
                            <img
                                src={
                                    friend?.avatar ||
                                    "https://i.pravatar.cc/150"
                                }
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        )}

                        {/* MESSAGE */}

                        <div
                            className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow-sm ${
                                msg.sender === userId
                                    ? "bg-primary text-white rounded-br-md"
                                    : "bg-white border rounded-bl-md"
                            }`}
                        >
                            {msg.text}
                        </div>

                        {/* MY AVATAR */}

                        {msg.sender === userId && (
                            <img
                                src={me?.avatar || "https://i.pravatar.cc/150"}
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* INPUT */}

            <div className="p-4 border-t bg-background">
                <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-sm"
                    />

                    <button
                        onClick={sendMessage}
                        className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Messages;
