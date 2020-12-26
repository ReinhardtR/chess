import { io } from "socket.io-client";
import { createContext } from "react";

const host =
  window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://reinhardtr.herokuapp.com";

export const socket = io.connect(host, {
  transports: ["websocket"],
});

export const SocketContext = createContext();
