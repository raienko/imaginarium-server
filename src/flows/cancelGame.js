const gameService = require('src/modules/game');
const socketService = require('src/modules/sockets');
const userService = require('src/modules/user');
const matchmakingService = require('src/modules/matchmaking');

module.exports = async (gameId) => {
  console.log('Canceling game: ', gameId);
  const game = await gameService.findGame(gameId);
  if (!game) {
    return
  }
  await userService.updateMultiple(game.users, { game: null });
  await socketService.cancelRoom(gameId);
  await matchmakingService.removeFromQueue(game.users);
  await socketService.sendRoomMessage(gameId, { type: 'game_canceled' });
  console.log('Game canceled: ', gameId);
}
