import React, { useContext, useState } from "react";
import ChessGame from "./components/ChessGame";
import { SocketContext } from "./server";
import ServerList from "./components/ServerList";
import Button from "./components/Button";
import Modal from "./components/Modal";
import Form from "./components/Form";
import CreateRoomForm from "./containers/CreateRoomForm";
import { ReactComponent as ArrowIcon } from "./assets/arrow.svg";

export default function App() {
  const socket = useContext(SocketContext);

  const [username, setUsername] = useState("Guest");
  const [room, setRoom] = useState();
  const [playerColor, setPlayerColor] = useState("white");
  const [showMenu, setShowMenu] = useState(true);
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [roomIsFull, setRoomIsFull] = useState(false);

  const createRoom = ({ name, password }) => {
    const newRoom = {
      id: socket.id,
      name,
      password,
      creator: username,
      player: "",
    };
    socket.emit("create-room", newRoom);
    setCreatingRoom(false);
    setRoom(newRoom);
  };

  const joinRoom = (newRoom) => {
    if (newRoom.player) {
      setRoomIsFull(true);
      return;
    }
    socket.emit("join-room", { username, id: newRoom.id });
    setRoom(newRoom);
    setPlayerColor("black");
  };

  const leaveRoom = () => {
    socket.emit("leave-room", room);
    console.log(room);
    setRoom();
    console.log(room);
  };

  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden bg-secondary">
        <div
          className={`absolute flex inset-y-0 left-0 z-10  h-screen ${
            showMenu ? "animate-slide-in" : "animate-slide-out"
          }`}
        >
          <div className="relative flex flex-col justify-between items-center bg-white p-4 shadow-2xl space-y-2">
            <Form.TextInput
              label="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <span className="text-xl self-start text-secondary pt-4">
              Rooms
            </span>
            <ServerList handleClick={(newRoom) => joinRoom(newRoom)} />
            <Button
              extraClass={room ? "bg-tertiary" : "bg-primary-gradient"}
              handleClick={() => (room ? leaveRoom() : setCreatingRoom(true))}
            >
              {room ? "LEAVE ROOM" : "CREATE ROOM"}
            </Button>
          </div>
          <div className="relative m-2">
            <Button
              extraClass={"bg-secondary"}
              handleClick={() => setShowMenu(!showMenu)}
            >
              <ArrowIcon
                className={`w-4 h-4 fill-current animate-rotate-${showMenu}`}
              />
            </Button>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 z-0">
          <div className="flex justify-center items-center w-screen h-screen">
            <ChessGame key={room} room={room} playerColor={playerColor} />
          </div>
        </div>
      </div>
      <Modal
        visible={creatingRoom || roomIsFull}
        errorStyle={roomIsFull}
        title={roomIsFull ? "Room is full" : "Create a room"}
        handleClick={() =>
          creatingRoom ? setCreatingRoom(false) : setRoomIsFull(false)
        }
      >
        {creatingRoom && (
          <CreateRoomForm
            handleSubmit={(roomName, roomPassword) => {
              createRoom({
                name: roomName,
                password: roomPassword,
              });
            }}
          />
        )}
      </Modal>
    </>
  );
}
