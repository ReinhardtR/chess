import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "./server";
import Chess from "chess.js";
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import Modal from "./components/Modal";

const chess = new Chess();

export default function ChessGame({ room, playerColor }) {
  const socket = useContext(SocketContext);

  const [turn, setTurn] = useState("white");
  const [lastMove, setLastMove] = useState();
  const [pendingMove, setPendingMove] = useState();
  const [fen, setFen] = useState("");
  const [selectVisible, setSelectVisible] = useState(false);

  // Recieve move from server
  useEffect(() => {
    console.log(turn);
    socket.on("move", (move) => {
      chess.move({ from: move[0], to: move[1] });
      setLastMove(move);
      setFen(chess.fen());
    });
  }, [lastMove]);

  // Send move to server
  useEffect(() => {
    if (lastMove) {
      socket.emit("move", { room, move: lastMove });
    } else {
      return;
    }
  }, [turn]);

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
      // setTimeout(randomMove, 500);
    }
  };

  // const randomMove = () => {
  //   const moves = chess.moves({ verbose: true });
  //   const move = moves[Math.floor(Math.random() * moves.length)];
  //   if (moves.length > 0) {
  //     chess.move(move.san);
  //     setFen(chess.fen());
  //     setLastMove([move.from, move.to]);
  //   }
  // };

  const promotion = (piece) => {
    const from = pendingMove[0];
    const to = pendingMove[1];
    chess.move({ from, to, promotion: piece });
    setFen(chess.fen());
    setLastMove([from, to]);
    // Close popup
    setSelectVisible(false);
    // setTimeout(randomMove, 500);
  };

  const turnColor = () => {
    return turn === "white" ? "black" : "white";
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
      color: playerColor,
    };
  };

  return (
    <div className="bg-white h-screen flex justify-center items-center">
      <div>{room}</div>
      <Chessground
        width="40vw"
        height="40vw"
        turnColor={turn}
        movable={calcMovable()}
        lastMove={lastMove}
        fen={fen}
        onMove={onMove}
        orientation={playerColor}
      />
      <Modal visible={selectVisible}>
        {["q", "r", "b", "n"].map((piece) => (
          <div
            className="group flex justify-center items-center w-24 h-24 transition-all rounded-full transform hover:bg-blue-500 hover:scale-110"
            key={piece}
          >
            <div
              onClick={() => promotion(piece)}
              className={`piece ${turn}-${piece} w-5/6 h-5/6 transition-all transform group-hover:-translate-y-1`}
            />
          </div>
        ))}
      </Modal>
    </div>
  );
}
