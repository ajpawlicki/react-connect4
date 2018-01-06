import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import GameBoardCell from './GameBoardCell.jsx';

class GameBoardRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        {this.props.row.map((cell, colIndex) => {
          return <GameBoardCell
            cell={cell}
            key={colIndex}
            colIndex={colIndex}
            rowIndex={this.props.rowIndex}
            handleCellClick={this.props.handleCellClick} />
        })}
      </tr>
    );
  }

}

export default GameBoardRow;