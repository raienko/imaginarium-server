const { throwError } = require('src/utils');
const gameService = require('./');
const Game = require('./Game');

const fetchGame = async (req, res) => {
  const game = await gameService.fetchGame();
  return res.send(game);
};

const createGame = async (req, res) => {
  const game = await gameService.createGame({
    users: req.body.users,
    turn: req.user,
  });
  return res.send(game);
};

const playAssociation = async (req, res) => {
  const game = await gameService.updateGame(req.body.game, req.body.association, req.body.card);
  // pingUsersToUpdateGame
  return game;
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
  const user = 1;
  await gameService.leaveGame(user);
  return res.send('User left game');
}

module.exports = {
  fetchGame,
  createGame,
  leaveGame,
  playCard,
  playAssociation,
}
