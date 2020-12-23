import React, { useContext, useState, useEffect } from "react";
import { SocketContext } from "../server";
import Loading from "../components/Loading";
import { ReactComponent as LockIcon } from "../assets/lock.svg";

export default function ServerList({ handleClick, children, ...restProps }) {
  const socket = useContext(SocketContext);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.emit("req-server-rooms");
  }, [socket]);

  socket.on("get-server-rooms", (serverRooms) => {
    setRooms(serverRooms);
  });

  console.log(rooms);

  return (
    <div {...restProps} className="flex flex-col w-auto h-4/5">
      <div className="-my-2 overflow-x-auto py-2 align-middle inline-block min-w-full">
        <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-secondary text-xs font-medium text-left tracking-wider">
                <th scope="col" className="p-1"></th>
                <th scope="col" className="pr-6 py-3">
                  ROOM NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  PLAYERS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 px-4">
              {rooms.length ? (
                rooms.map((room) => (
                  <ServerList.Item
                    key={room.creator}
                    roomName={room.name}
                    creator={room.creator}
                    player={room.player}
                    password={room.password}
                    status={"Waiting for players"}
                    handleClick={() => handleClick(room)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center font-medium">
                    <div className="text-tertiary m-2">No rooms.</div>
                    <div className="text-secondary m-2">
                      Create a room to play online.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {children}
    </div>
  );
}

ServerList.Item = ({ handleClick, roomName, creator, player, password }) => {
  return (
    <tr onClick={handleClick} className="cursor-pointer h-16">
      <td className="px-2">
        {password && (
          <LockIcon className="text-tertiary block w-6 h-6 fill-current" />
        )}
      </td>
      <td className="py-2 whitespace-nowrap">
        <div className="flex items-center ml-1 text-sm font-medium text-secondary">
          {roomName}
        </div>
      </td>
      <td className="px-6 py-2 whitespace-nowrap text-sm">
        <div>{creator}</div>
        <div>{player}</div>
      </td>
    </tr>
  );
};
