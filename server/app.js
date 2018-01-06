const express = require('express');
const app = express();

const Connect4 = require('./game-logic/Connect4');

let game = new Connect4();

app.use(express.static(__dirname + '/../react-client/dist/'));

app.get('/fetchGame', (req, res) => {
  res.send(game);
});

app.listen(4000, () => console.log('Listening on port 4000!'));
