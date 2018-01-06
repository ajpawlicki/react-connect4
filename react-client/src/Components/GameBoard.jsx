import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import GameBoardRow from './GameBoardRow.jsx';

class GameBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <table>
        <tbody>
          {this.props.board.map((row, rowIndex) => {
            return <GameBoardRow
              row={row}
              key={rowIndex}
              rowIndex={rowIndex}
              handleCellClick={this.props.handleCellClick} />
          })}
        </tbody>
      </table>
    );
  }

}

export default GameBoard;