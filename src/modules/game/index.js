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

const findGame = async (id) => {
  const game = Game.findById(id);
  return game;
}

const updateGame = async (id, params) => {
  const game = Game.findOneAndUpdate(id, params, {returnOriginal: false})
  return game;
}

const removeGame = async (id) => {
  return Game.findByIdAndDelete(id);
}

module.exports = {
  createGame,
  updateGame,
  findGame,
  removeGame,
}
