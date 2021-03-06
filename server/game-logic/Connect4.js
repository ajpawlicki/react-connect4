class Connect4 {
  constructor() {
    this.board = [];
    this.player = 1;
    this.numberOfMoves = 0;
    this.isTieGame = false;
    this.isWinner = false;
  }

  initBoard() {
    for (let i = 0; i < 7; i++) {
      this.board[i] = [];
      for (let j = 0; j < 7; j++) {
        this.board[i][j] = null;
      }
    }
  }

  togglePlayer() {
    this.player = this.player === 1 ? 2 : 1;
  }

  placePiece(row, col, player) {
    this.board[row][col] = player;
  }

  dropPiece(col) {
    if (this.isWinner || this.isTieGame) return;

    for (let rowIndex = 6; rowIndex >= 0; rowIndex--) {
      if (this.isValidMove(rowIndex, col)) {
        this.placePiece(rowIndex, col, this.player);
        
        this.numberOfMoves++;

        if (this.checkForWinner({row: rowIndex, col})) this.isWinner = true;
        if (this.numberOfMoves === 49 && !this.isWinner) this.isTieGame = true;

        if (!this.isWinner && !this.isTieGame) this.togglePlayer();
        
        return;
      }
    }

    throw new Error('Invalid move.');
  }

  isValidMove(row, col) {
    return this.board[row][col] === null;
  }

  checkForWinner({row, col}) {
    return this.checkRowForWinner(row, col) ||
      this.checkColForWinner(row, col) ||
      this.checkDiagonalsForWinner(row, col);
  }

  checkRowForWinner(row, col) {
    let count = 0;

    for (let colIndex = 0; colIndex < 7; colIndex++) {
      if (this.board[row][col] === this.board[row][colIndex]) {
        count++;

        if (count === 4) return true;
      } else {
        count = 0;
      }
    }

    return false;
  }

  checkColForWinner(row, col) {
    let count = 0;
    
    for (let rowIndex = 0; rowIndex < 7; rowIndex++) {
      if (this.board[rowIndex][col] === this.board[row][col]) {
        count++;

        if (count === 4) return true;
      } else {
        count = 0;
      }
    }

    return false;
  }

  checkDiagonalsForWinner(row, col) {
    return this.checkMajorDiagonal(row, col) || this.checkMinorDiagonal(row, col);
  }

  checkMajorDiagonal(row, col) {
    let currRow = Math.min(row + col, 6);
    let currCol = Math.max(col + row - 6, 0);

    let count = 0;

    while (currRow >= 0 && currCol <= 6) {
      if (this.board[row][col] === this.board[currRow][currCol]) {
        count++;

        if (count === 4) return true;
      } else {
        count = 0;
      }

      currRow--;
      currCol++;
    }

    return false;
  }

  checkMinorDiagonal(row, col) {
    let currRow = Math.max(row - col, 0);
    let currCol = Math.max(col - row, 0);

    let count = 0;

    while (currRow <= 6 && currCol <= 6) {
      if (this.board[row][col] === this.board[currRow][currCol]) {
        count++;

        if (count === 4) return true;
      } else {
        count = 0;
      }

      currRow++;
      currCol++;
    }

    return false;
  }
}

module.exports = Connect4;
