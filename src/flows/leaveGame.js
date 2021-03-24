const gameService = require('src/modules/game');
const socketService = require('src/modules/sockets');
const userService = require('src/modules/user');
const { minPlayers } = require('src/config');
const cancelGame = require('src/flows/cancelGame');

module.exports = async (user) => {
  const profile = await userService.fetchUser(user);
  const gameId = profile.game;
  console.log(`User ${user} leaving game: ${gameId}`);
  const game = await gameService.leaveGame(gameId, user);
  await userService.updateUser(user, { game: null });
  const usersAmount = game.users.length;

  if (usersAmount < minPlayers) {
    return cancelGame(gameId);
  }

  await socketService.kickFromRoom(gameId, [user]);
  await socketService.sendMessage(user, { type: 'game_canceled' });
  console.log(`User ${user} left game ${gameId}`)
}
