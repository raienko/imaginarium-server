const gameService = require('src/modules/game');
const socketService = require('src/modules/sockets');
const userService = require('src/modules/user');
const matchmakingService = require('src/modules/matchmaking');

module.exports = async (users, params) => {
  console.log('Creating game for: ', users, params);
  const game = await gameService.createGame({ users, ...params });
  await userService.updateMultiple(users, { game: game._id });
  await socketService.createRoom(game._id, users);
  await matchmakingService.removeFromQueue(users);
  await socketService.sendRoomMessage(game._id, { type: 'game_created' });
  console.log('Users matched: ', game._id);
}
