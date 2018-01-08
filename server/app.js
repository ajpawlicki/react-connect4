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
  
  const data = {};

  try {
    game.dropPiece(col);
  } catch (err) {
    data.error = err.message;
  }

  res.send(data);
});

app.put('/restartGame', (req, res) => {
  game = new Connect4();
  game.initBoard();

  res.end();
});

app.listen(4000, () => console.log('Listening on port 4000!'));
