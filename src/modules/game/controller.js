const gameService = require('./');

const fetchGame = async (req, res) => {
  const game = await gameService.findGame();
  return res.send(game);
};

const createGame = async (req, res) => {
  const game = await gameService.createGame();
  return res.send(game);
};

const updateGame = async (req, res) => {
  const game = await gameService.createGame();
  return res.send('Game updated');
}

const leaveGame = (req, res) => {
  return res.send('User left game');
}

module.exports = {
  fetchGame,
  createGame,
  updateGame,
  leaveGame,
}
