import { io } from "socket.io-client";

export const socket = io("https://devconnect-1-sl2s.onrender.com", {
    withCredentials: true,
});