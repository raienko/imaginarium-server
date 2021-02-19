const { nextIndex } = require('src/utils');

const nextTurn = (game) => {
  const current = game.players.findIndex(game.turn);
  const next = nextIndex(current, game.players);
  return game.players[next];
}

module.exports = {
   nextTurn,
}
