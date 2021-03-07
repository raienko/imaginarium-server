const userService = require('src/modules/user');
const Game = require('./Game');

const createGame = async (params) => {
  const game = new Game(params);
  return game.save();
}

const fetchGame = async (user) => {
  return Game.findOne({ 'users': user });
}

const updateGame = async (_id, update) => {
  return Game.findOneAndUpdate({ _id }, update);
}

const deleteGame = async (_id) => {
  return Game.deleteOne({ _id });
}

const leaveGame = async (_id, user) => {
  await userService.updateUser(_id, { game: null });
  return Game.findByIdAndUpdate(_id, {users: {$pull: user}}, {new: true});
}

module.exports = {
  createGame,
  updateGame,
  fetchGame,
  deleteGame,
  leaveGame,
}
