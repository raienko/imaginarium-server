const Game = require('./Game');
const { generateID } = require('src/utils');

const createGame = async (params) => {
  const options = {
    id: generateID(),
    players: ['fake_0'],
  };
  const game = new Game(options);
  await game.save();
  return game;
}

const fetchGame = async (id) => {
  return Game.findById(id);
}

const updateGame = async (id, params) => {
  return Game.findByIdAndUpdate(id, params, {returnOriginal: false})
}

const deleteGame = async (id) => {
  return Game.findByIdAndDelete(id);
}

module.exports = {
  createGame,
  updateGame,
  fetchGame,
  deleteGame,
}
