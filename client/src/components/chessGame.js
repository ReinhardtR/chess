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
      fen: "start",
      selectVisible: false,
      check: false,
    };
  }

  componentDidMount() {
    this.context.on("move", ({ move }) => {
      this.chess.move(move);
      this.setState({
        turn: this.props.playerColor,
        lastMove: move,
        fen: this.chess.fen(),
      });
    });
  }

  sendMoveToServer() {
    this.context.emit(
      "move",
      {
        room: this.props.room,
        move: this.state.lastMove,
      },
      () => this.afterMove()
    );
  }

  afterMove() {
    const color = this.props.room ? this.props.playerColor : this.state.turn;
    this.setState({
      turn: color === "white" ? "black" : "white",
      check: this.chess.in_check(),
    });
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
        },
        () => {
          this.afterMove();
          if (this.props.room) this.sendMoveToServer();
        }
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
      () => {
        this.afterMove();
        if (this.props.room) this.sendMoveToServer();
      }
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
      color: this.props.room ? this.props.playerColor : this.state.turn,
    };
  };

  render() {
    return (
      <div className="bg-white flex justify-center items-center">
        <Chessground
          width="100vmin"
          height="100vmin"
          turnColor={this.state.turn}
          movable={this.calcMovable()}
          lastMove={this.lastMove}
          fen={this.state.fen}
          onMove={this.onMove}
          orientation={this.props.playerColor}
          check={this.state.check}
          animation={{ duration: 500 }}
          drawable={{ defaultSnapToValidMove: false }}
        />
        <Modal visible={this.state.selectVisible}>
          {["q", "r", "b", "n"].map((piece) => (
            <div
              className="group flex justify-center items-center w-24 h-24 transition-all rounded-full transform hover:bg-blue-500 hover:scale-110 text-center"
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
