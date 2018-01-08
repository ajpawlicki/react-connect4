import React from 'react';

const GameBoardRow = props => {
  return (
    <tr className="board-row">
      
      {props.row.map((cell, colIndex) => {
        return (
          <td
            key={colIndex}
            className="board-cell"
            onClick={() => props.handleCellClick(colIndex)}
          >
            {cell ? <i className={`fa fa-futbol-o fa-2x player-${cell}`} aria-hidden="true"></i> : null}
          </td>
        );
      })}

    </tr>
  );
};

export default GameBoardRow;
