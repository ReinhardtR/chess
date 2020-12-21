const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 4000;

var serverRooms = [];

io.on("connection", (socket) => {
  // Join room
  socket.on("join-room", ({ id, create }) => {
    socket.join(id);
    if (create) serverRooms.push(id);
  });

  // Recieve move
  socket.on("move", ({ room, move }) => {
    console.log(move);
    socket.to(room).emit("move", { move });
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });

  // Send list of rooms
  socket.on("req-server-rooms", () => {
    io.emit("get-server-rooms", serverRooms);
  });
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
