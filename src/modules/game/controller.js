const Game = require('./Game');
const { generateID } = require('src/utils');

const createGame = async (req, res) => {
  console.log('Creating game!');
  const params = {
    id: generateID(),
    players: ['fake_0'],
  };
  const game = new Game(params);
  await game.save();
  console.log('Game created!');
  const games = await Game.list();
  console.log({ games });
  return res.send(game);
};

const updateGame = (req, res) => {
  return res.send('Game updated');
}

const deleteGame = (req, res) => {
  return res.send('Game deleted');
}

module.exports = {
  createGame,
  updateGame,
  deleteGame,
}
