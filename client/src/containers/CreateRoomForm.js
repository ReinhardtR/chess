import React, { useState } from "react";
import Form from "../components/Form";

export default function CreateRoomForm({ handleSubmit }) {
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");

  return (
    <Form handleSubmit={() => handleSubmit(roomName, roomPassword)}>
      <Form.TextInput
        label={"Room Name"}
        placeholder={"Name of the room"}
        value={roomName}
        required={true}
        onChange={({ target }) => setRoomName(target.value)}
      />
      <Form.TextInput
        label={"Room Password"}
        placeholder={"Public room if empty"}
        value={roomPassword}
        onChange={({ target }) => setRoomPassword(target.value)}
      />
      <Form.Submit value="CREATE ROOM" />
    </Form>
  );
}
