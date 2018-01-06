import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class GameBoardCell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <td onClick={() => this.props.handleCellClick(this.props.colIndex)}>
        {this.props.cell || 'open'}
      </td>
    );
  }

}

export default GameBoardCell;