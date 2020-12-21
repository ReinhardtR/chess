import { io } from "socket.io-client";
import { createContext } from "react";

export const socket = io.connect("http://localhost:4000", {
  transports: ["websocket"],
});

export const SocketContext = createContext();
