import React, { useContext, useState } from "react";
import ChessGame from "./components/ChessGame";
import { SocketContext } from "./server";
import Loading from "./components/Loading";

export default function App() {
  const socket = useContext(SocketContext);

  const [connecting, setConnecting] = useState(true);
  const [rooms, setRooms] = useState();
  const [roomId, setRoomId] = useState();
  const [playerColor, setPlayerColor] = useState();

  socket.on("get-server-rooms", (serverRooms) => {
    setRooms(serverRooms);
  });

  const getRooms = () => {
    socket.emit("req-server-rooms");
  };

  const joinRoom = ({ id, create = false }) => {
    socket.emit("join-room", { id, create });
    setRoomId(id);
    setPlayerColor(create ? "white" : "black");
    setConnecting(false);
  };

  if (connecting) {
    return (
      <>
        <button onClick={() => getRooms()}>GET ROOMS</button>
        <button onClick={() => joinRoom({ id: socket.id, create: true })}>
          CREATE OWN ROOM
        </button>
        <div className="h-screen w-screen flex justify-center items-center">
          <Loading
            className="w-32 h-32 text-blue-600 font-bold text-2xl"
            text="Connecting"
          />
        </div>
        <div>
          {rooms &&
            Object.keys(rooms).length !== 0 &&
            rooms.map((id) => (
              <div key={id}>
                <button onClick={() => joinRoom({ id })}>JOIN ROOM {id}</button>
              </div>
            ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <ChessGame room={roomId} playerColor={playerColor} />
      </>
    );
  }
}
