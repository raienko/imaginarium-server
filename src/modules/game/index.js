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

const leaveGame = async (user) => {
  const game = await Game.findOne({players: [user]});
  // remove player
  return game;
}

module.exports = {
  createGame,
  updateGame,
  fetchGame,
  deleteGame,
  leaveGame,
}
