import React from "react";
import Chess from "chess.js";
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import { Modal } from "antd";
import "antd/dist/antd.css";
import queen from "../images/wQ.svg";
import rook from "../images/wR.svg";
import bishop from "../images/wB.svg";
import knight from "../images/wN.svg";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();

    this.chess = new Chess();

    this.state = {
      lastMove: undefined,
      pendingMove: undefined,
      fen: "",
      selectVisible: false,
    };
  }

  onMove = (from, to) => {
    const moves = this.chess.moves({ verbose: true });
    for (let i = 0, len = moves.length; i < len; i++) {
      if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
        this.setState({
          pendingMove: [from, to],
          selectVisible: true,
        });
        return;
      }
    }
    if (this.chess.move({ from, to, promotion: "x" })) {
      this.setState({
        fen: this.chess.fen(),
        lastMove: [from, to],
      });
      setTimeout(this.randomMove, 500);
    }
  };

  randomMove = () => {
    const moves = this.chess.moves({ verbose: true });
    const move = moves[Math.floor(Math.random() * moves.length)];
    if (moves.length > 0) {
      this.chess.move(move.san);
      this.setState({
        fen: this.chess.fen(),
        lastMove: [move.from, move.to],
      });
    }
  };

  promotion = (piece) => {
    this.setState({ pendingPromotion: true });

    if (!this.state.pendingPromotion) {
      const from = this.state.pendingMove[0];
      const to = this.state.pendingMove[1];
      this.chess.move({ from, to, promotion: piece });
      this.setState({
        fen: this.chess.fen(),
        lastMove: [from, to],
        selectVisible: false,
      });
      setTimeout(this.randomMove, 500);
    }
  };

  turnColor = () => {
    return this.chess.turn() === "w" ? "white" : "black";
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
      color: "white",
    };
  };

  render() {
    return (
      <div style={{ background: "#2b313c", height: "100vh" }}>
        <div style={{ paddingTop: "10vh" }}>
          <Chessground
            width="38vw"
            height="38vw"
            turnColor={this.turnColor()}
            movable={this.calcMovable()}
            lastMove={this.lastMove}
            fen={this.state.fen}
            onMove={this.onMove}
            style={{ margin: "auto" }}
          />
        </div>
        <Modal
          title="Promotion"
          visible={this.state.selectVisible}
          footer={null}
          closable={false}
        >
          <div style={{ textAlign: "center", cursor: "pointer" }}>
            <img
              src={queen}
              alt="Queen"
              style={{ width: 50 }}
              onClick={() => this.promotion("q")}
            />
            <img
              src={rook}
              alt="Rook"
              style={{ width: 50 }}
              onClick={() => this.promotion("r")}
            />
            <img
              src={bishop}
              alt="Bishop"
              style={{ width: 50 }}
              onClick={() => this.promotion("b")}
            />
            <img
              src={knight}
              alt="Knight"
              style={{ width: 50 }}
              onClick={() => this.promotion("n")}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
