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
      result: { title: "", desc: "" },
    };
  }

  componentDidMount() {
    if (this.props.room) {
      this.context.on("move", (move) => {
        this.chess.move(move);
        this.setState({
          turn: this.props.playerColor,
          lastMove: move,
          fen: this.chess.fen(),
        });
      });

      this.context.on("you-won", (desc) => {
        this.setState({
          result: {
            title: "You lost",
            desc,
          },
        });
      });
    }
  }

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
        }
      );
    }
  };

  afterMove() {
    const color = this.props.room ? this.props.playerColor : this.state.turn;
    this.setState({
      turn: color === "white" ? "black" : "white",
    });
    if (this.props.room) this.sendMoveToServer();
    this.checkResult();
  }

  sendMoveToServer() {
    this.context.emit("move", {
      roomId: this.props.room.id,
      move: this.state.lastMove,
    });
  }

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
      }
    );
  };

  checkResult() {
    if (this.chess.in_checkmate()) {
      this.setState({
        result: {
          title: "You won",
          desc: "Checkmate.",
        },
      });
      this.context.emit("checkmate", this.props.room.id);
    } else if (this.chess.in_stalemate()) {
      this.setState({
        result: {
          title: "Draw",
          desc: "Stalemate position.",
        },
      });
    } else if (this.chess.in_threefold_repetition()) {
      this.setState({
        result: {
          title: "Draw",
          desc: "Threefold repitition.",
        },
      });
    } else if (this.chess.insufficient_material()) {
      this.setState({
        result: {
          title: "Draw",
          desc: "Insufficient material.",
        },
      });
    }
  }

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
          check={this.chess.in_check()}
          animation={{ duration: 500 }}
          drawable={{ defaultSnapToValidMove: false }}
        />
        <Modal visible={this.state.selectVisible} title="Promotion">
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
        <Modal
          visible={this.state.result.title}
          title={this.state.result.title}
          handleClick={() => this.props.endGame()}
        >
          <p className="text-base">{this.state.result.desc}</p>
        </Modal>
      </div>
    );
  }
}
ChessGame.contextType = SocketContext;
