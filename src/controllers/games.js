const games = require('../../database/games');

const createGame = (req, res) => {
  console.log('CREATE GAME!');
  const params = {};
  const game = {id: `${Date.now()}`};
  games.push(game);
  console.log('Game created');
  return res.send(game);
};

const updateGame = (req, res) => {
  return res.send('Game updated');
}

const deleteGame = (req, res) => {
  return res.send('Game deleted');
}

module.exports = {
  createGame,
  updateGame,
  deleteGame,
}
