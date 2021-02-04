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

const fetchGame = async (_id) => {
  return Game.findOne({ _id });
}

const updateGame = async (_id, update) => {
  return Game.findOneAndUpdate({ _id }, update, {new: true})
}

const deleteGame = async (_id) => {
  return Game.deleteOne({ _id });
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
