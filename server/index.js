const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 4000;

var serverRooms = [];

io.on("connection", (socket) => {
  const updateServerList = () => {
    io.emit("get-server-rooms", serverRooms);
  };

  const leaveRoom = (room) => {
    socket.to(room.id).emit("you-won", "Your opponent left.");
    const index = serverRooms.findIndex((r) => r.id === room.id);
    if (socket.id === room.id) {
      serverRooms.splice(index, 1);
    } else {
      serverRooms[index].player = {
        name: "",
        id: "",
      };
    }
    updateServerList();
  };

  socket.on("create-room", (room) => {
    socket.join(room.id);
    serverRooms.push(room);
    updateServerList();
  });

  socket.on("join-room", ({ username, id }) => {
    socket.join(id);
    const serverRoom = serverRooms.find((room) => room.id === id);
    serverRoom.player = {
      name: username,
      id: socket.id,
    };
    updateServerList();
  });

  socket.on("leave-room", (room) => {
    leaveRoom(room);
  });

  socket.on("move", ({ roomId, move }) => {
    socket.to(roomId).emit("move", move);
  });

  socket.on("checkmate", (roomId) => {
    socket.to(roomId).emit("you-won", "Checkmate.");
  });

  socket.on("disconnect", () => {
    const room = serverRooms.find((serverRoom) => {
      return (
        serverRoom.creator.id === socket.id ||
        serverRoom.player.id === socket.id
      );
    });
    if (room) leaveRoom(room);
  });

  socket.on("req-server-rooms", updateServerList);
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
