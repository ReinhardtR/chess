import React from "react";
import { SocketContext } from "../server";
import Chess from "chess.js";
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import Modal from "./Modal";

export default class ChessGame extends React.Component {
  constructor() {
    super();

    this.chess = new Chess();

    this.state = {
      turn: "white",
      lastMove: undefined,
      pendingMove: undefined,
      fen: "",
      selectVisible: false,
    };
  }

  componentDidMount() {
    console.log("stateTurn", this.state.turn);
    console.log("propsColor", this.props.playerColor);
    this.context.on("move", ({ move }) => {
      console.log(move);
      this.chess.move(move);
      this.setState({
        turn: this.props.playerColor,
        lastMove: move,
        fen: this.chess.fen(),
      });
    });
  }

  componentWillUnmount() {
    this.context.disconnect();
  }

  sendMoveToServer() {
    console.log(this.state.lastMove);
    this.context.emit(
      "move",
      {
        room: this.props.room,
        move: this.state.lastMove,
      },
      () =>
        this.setState({
          turn: this.props.playerColor === "white" ? "black" : "white",
        })
    );
  }

  onMove = (from, to) => {
    const moves = this.chess.moves({ verbose: true });
    for (let i = 0, len = moves.length; i < len; i++) {
      if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
        this.setState({
          pendingMove: [from, to],
          selectVisible: true,
        });
      }
    }
    if (this.chess.move({ from, to, promotion: "x" })) {
      this.setState(
        {
          fen: this.chess.fen(),
          lastMove: { from, to },
          turn: this.props.playerColor === "white" ? "black" : "white",
        },
        () => this.sendMoveToServer()
      );
    }
  };

  promotion = (piece) => {
    const move = {
      from: this.state.pendingMove[0],
      to: this.state.pendingMove[1],
      promotion: piece,
    };
    this.chess.move(move);
    this.setState(
      {
        fen: this.chess.fen(),
        lastMove: move,
        selectVisible: false,
      },
      () => this.sendMoveToServer()
    );
  };

  calcMovable = () => {
    const dests = new Map();
    this.chess.SQUARES.forEach((square) => {
      const moves = this.chess.moves({ square, verbose: true });
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
      color: this.props.playerColor,
    };
  };

  render() {
    return (
      <div className="bg-white h-screen flex justify-center items-center">
        <div>{this.props.room}</div>
        <Chessground
          width="40vw"
          height="40vw"
          turnColor={this.state.turn}
          movable={this.calcMovable()}
          lastMove={this.lastMove}
          fen={this.state.fen}
          onMove={this.onMove}
          orientation={this.props.playerColor}
        />
        <Modal visible={this.state.selectVisible}>
          {["q", "r", "b", "n"].map((piece) => (
            <div
              className="group flex justify-center items-center w-24 h-24 transition-all rounded-full transform hover:bg-blue-500 hover:scale-110"
              key={piece}
            >
              <div
                onClick={() => this.promotion(piece)}
                className={`piece ${this.state.turn}-${piece} w-5/6 h-5/6 transition-all transform group-hover:-translate-y-1`}
              />
            </div>
          ))}
        </Modal>
      </div>
    );
  }
}
ChessGame.contextType = SocketContext;
