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
  return Game.findByIdAndUpdate(_id, {$pull: { users: user }}, {new: true});
}

const findGame = async (_id) => {
  return Game.findOne({ _id });
}

const listGames = async () => Game.find();

module.exports = {
  createGame,
  updateGame,
  fetchGame,
  deleteGame,
  leaveGame,
  findGame,
  listGames,
}
