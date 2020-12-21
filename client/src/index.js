import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { SocketContext, socket } from "./server";

ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <App />
  </SocketContext.Provider>,
  document.getElementById("root")
);
