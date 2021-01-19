const Game = require('../models/Game');
const { generateID } = require('../utils');

const createGame = async (req, res) => {
  console.log('Creating game!');
  const params = {
    id: generateID(),
    players: ['fake_0'],
  };
  const game = new Game(params);
  await game.save();
  console.log('Game created!');
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
