import { io } from "socket.io-client";

const getSocketUrl = () => {
  const apiUrl =
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_URL) ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
    "http://localhost:9000/api/v1";
  return apiUrl.replace(/\/api\/v1\/?$/, "").replace(/\/api\/?$/, "");
};

let socketInstance = null;

if (typeof window !== "undefined") {
  socketInstance = io(getSocketUrl(), {
    autoConnect: true,
    reconnection: true,
    transports: ["websocket", "polling"],
  });

  socketInstance.on("connect", () => {
    console.log("[SOCKET] Connected to realtime server with ID:", socketInstance.id);
  });

  socketInstance.on("connect_error", (err) => {
    console.warn("[SOCKET] Connection error notice:", err.message);
  });
} else {
  socketInstance = {
    on: () => {},
    off: () => {},
    emit: () => {},
    id: null,
  };
}

export const socket = socketInstance;

