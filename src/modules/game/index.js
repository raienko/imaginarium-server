const userService = require('src/modules/user');
const cardsService = require('src/modules/cards');
const { nextTurn } = require('./utils');
const Game = require('./Game');

const createGame = async (params) => {
  const users = await userService.findUsers(params.users);
  const deck = await cardsService.getDeck();
  const game = new Game({
    ...params,
    users,
    deck,
  });
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

const leaveGame = async (_id, user) => {
  await userService.updateUser(_id, { game: null });
  const game = await Game.findById(_id);
  const updates = {};
  if (game.turn === user) {
    updates.turn = nextTurn(game);
  }

  updates.players = game.players.map(player => {
    if (player._id === user) {
      return {
        ...player,
        status: 'left',
      }
    } else {
      return player;
    }
  });

  return Game.findByIdAndUpdate(_id, updates);
}

module.exports = {
  createGame,
  updateGame,
  fetchGame,
  deleteGame,
  leaveGame,
}
