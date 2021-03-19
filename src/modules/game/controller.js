const { throwError } = require('src/utils');
const gameService = require('./');
const userService = require('../user');

const createGame = async (req, res) => {
  const game = await gameService.createGame({
    users: req.body.users,
    turn: req.user,
  });
  const users = await userService.findUsers(req.body.users);
  return res.json({
    ...game,
    users,
  });
};

const fetchGame = async (req, res) => {
  const game = await gameService.fetchGame(req.user);
  const users = await userService.findUsers(game.users);
  return res.json({
    ...game,
    users,
  });
};

const playAssociation = async (req, res) => {
  const game = await gameService.updateGame(req.body.game, req.body.association, req.body.card);
  // pingUsersToUpdateGame
  return res.json(game);
};

const playCard = async (req, res) => {
  const game = await gameService.fetchGame(req.body.game);
  if (!game) {
    throwError('No game found');
  }
  const flop = game.flop.concat(req.body.card);
  await gameService.updateGame(req.body.game, { flop });
  return game;
}

const leaveGame = async (req, res) => {
  await gameService.leaveGame(req.user);
  await userService.updateUser(req.user, { game: null });
  return res.send('User left game');
}

module.exports = {
  fetchGame,
  createGame,
  leaveGame,
  playCard,
  playAssociation,
}
