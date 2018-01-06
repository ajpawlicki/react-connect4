import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Game from '../../game/connect4.js';
import GameBoard from './GameBoard.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.game = new Game();
    this.game.initBoard();

    this.state = {
      board: this.game.board
    }

    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleCellClick(col) {
    const move = this.game.dropPiece(col);
    if (move) this.game.togglePlayer();
    if (this.game.checkWinner(move)) console.log('winner!');

    this.setState({
      board: this.state.board,
      lastMove: move
    });
  }

  render() {
    return (
      <div>
        <GameBoard board={this.state.board} handleCellClick={this.handleCellClick} />
      </div>
    );
  }

}

export default App;
