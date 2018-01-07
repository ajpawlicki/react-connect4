const express = require('express');
const app = express();

const Connect4 = require('./game-logic/Connect4');

let game = new Connect4();
game.initBoard();

app.use(express.static(__dirname + '/../react-client/dist/'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/fetchGame', (req, res) => {
  res.send(game);
});

app.post('/postMove', (req, res) => {
  const { col } = req.body;

  const move = game.dropPiece(col);

  const data = {};

  if (move) {
    if (game.isWinner) data.isWinner = true;
    if (game.isTieGame) data.isWinner = true;
    
    if (!game.isWinner && !game.isTieGame) game.togglePlayer();
    
    res.send(data);
  } else {
    data.error = 'Invalid move.';
    
    res.send(data);
  }

});

app.listen(4000, () => console.log('Listening on port 4000!'));
