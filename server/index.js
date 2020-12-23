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
    const index = serverRooms.findIndex((r) => r.id === room.id);
    console.log(index);
    if (socket.id === room.id) {
      socket.to(room).emit("creator-left");
      serverRooms.splice(index, 1);
    } else {
      console.log(serverRooms);
      console.log(serverRooms[index]);
      serverRooms[index].player = "";
    }
    updateServerList();
  };

  // Create room
  socket.on("create-room", (room) => {
    socket.join(room.id);
    serverRooms.push(room);
    updateServerList();
  });

  // Join room
  socket.on("join-room", ({ username, id }) => {
    socket.join(id);
    const serverRoom = serverRooms.find((room) => room.id === id);
    serverRoom.player = username;
    console.log(serverRoom);
    updateServerList();
  });

  // Leave room
  socket.on("leave-room", (room) => {
    leaveRoom(room);
  });

  // Recieve move
  socket.on("move", ({ room, move }) => {
    socket.to(room).emit("move", { move });
  });

  // Disconnect
  socket.on("disconnect", () => {
    const room = serverRooms.find((serverRoom) => serverRoom.id === socket.id);
    console.log(room);
    if (room) {
      leaveRoom(room);
    }
  });

  // Send list of rooms
  socket.on("req-server-rooms", updateServerList);
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
