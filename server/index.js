const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

const PORT = process.env.PORT || 4000;

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected.`);
  socket.on("msg", (fen) => {
    socket.broadcast.emit("msg", fen);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
