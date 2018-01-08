import React from 'react';

import GameBoardRow from './GameBoardRow.jsx';

const GameBoard = props => {
  return (
    <table className="board">
      <tbody>
        {props.board.map((row, rowIndex) => {
          return <GameBoardRow
            row={row}
            key={rowIndex}
            rowIndex={rowIndex}
            handleCellClick={props.handleCellClick} />
        })}
      </tbody>
    </table>
  );
};

export default GameBoard;
