import { io } from "socket.io-client";
import { createContext } from "react";

export const socket = io.connect("https://reinhardtr.herokuapp.com", {
  transports: ["websocket"],
});

export const SocketContext = createContext();
