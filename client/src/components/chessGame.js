import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Chess from "chess.js";
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import Modal from "./modal";
import Loading from "./loading";

const socket = io.connect("http://localhost:4000", {
  transports: ["websocket"],
  upgrade: false,
});

const chess = new Chess();

export default function ChessGame() {
  const [connecting, setConnecting] = useState(true);
  const [lastMove, setLastMove] = useState();
  const [pendingMove, setPendingMove] = useState();
  const [fen, setFen] = useState("");
  const [selectVisible, setSelectVisible] = useState(false);

  socket.on("connect", () => {
    setConnecting(false);
  });

  // Send fen to server
  useEffect(() => {
    socket.emit("msg", fen);
  }, [fen]);

  // Recieve fen from server
  useEffect(() => {
    socket.on("msg", (newFen) => {
      setFen(newFen);
    });
  }, [setFen]);

  const onMove = (from, to) => {
    const moves = chess.moves({ verbose: true });
    for (let i = 0, len = moves.length; i < len; i++) {
      if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
        setPendingMove([from, to]);
        setSelectVisible(true);
        return;
      }
    }
    if (chess.move({ from, to, promotion: "x" })) {
      setFen(chess.fen());
      setLastMove([from, to]);
      setTimeout(randomMove, 500);
    }
  };

  const randomMove = () => {
    const moves = chess.moves({ verbose: true });
    const move = moves[Math.floor(Math.random() * moves.length)];
    if (moves.length > 0) {
      chess.move(move.san);
      setFen(chess.fen());
      setLastMove([move.from, move.to]);
    }
  };

  const promotion = (piece) => {
    const from = pendingMove[0];
    const to = pendingMove[1];
    chess.move({ from, to, promotion: piece });
    setFen(chess.fen());
    setLastMove([from, to]);
    setSelectVisible(false);
    setTimeout(randomMove, 500);
  };

  const turnColor = () => {
    return chess.turn() === "w" ? "white" : "black";
  };

  const calcMovable = () => {
    const dests = new Map();
    chess.SQUARES.forEach((square) => {
      const moves = chess.moves({ square, verbose: true });
      if (moves.length) {
        dests.set(
          square,
          moves.map((move) => move.to)
        );
      }
    });

    return {
      free: false,
      dests,
      color: "white",
    };
  };

  return true ? (
    <div className="h-screen w-screen flex justify-center items-center">
      <Loading
        className="w-32 h-32 text-blue-600 font-bold text-2xl"
        text="Connecting"
      />
    </div>
  ) : (
    <div className="bg-white h-screen flex justify-center items-center">
      <Chessground
        width="40vw"
        height="40vw"
        turnColor={turnColor()}
        movable={calcMovable()}
        lastMove={lastMove}
        fen={fen}
        onMove={onMove}
      />
      <Modal visible={selectVisible}>
        {["q", "r", "b", "n"].map((piece) => (
          <div className="group flex justify-center items-center w-24 h-24 transition-all rounded-full transform hover:bg-blue-500 hover:scale-110">
            <div
              onClick={() => promotion(piece)}
              className={`piece ${turnColor()}-${piece} w-5/6 h-5/6 transition-all transform group-hover:-translate-y-1`}
              key={piece}
            />
          </div>
        ))}
      </Modal>
    </div>
  );
}
