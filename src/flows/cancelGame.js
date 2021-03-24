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
  await gameService.deleteGame(gameId)
  await userService.updateMultiple(game.users, { game: null });
  await socketService.sendRoomMessage(gameId, { type: 'game_canceled' });
  await matchmakingService.removeFromQueue(game.users);
  await socketService.cancelRoom(gameId);
  console.log('Game canceled: ', gameId);
  const games = await gameService.listGames();
  console.log('Active games: ', games);
}
