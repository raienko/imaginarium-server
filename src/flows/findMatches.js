const matchmakingService = require('src/modules/matchmaking');
const { minPlayers } = require('src/config');
const createGame = require('src/flows/createGame');

module.exports = async (params) => {
  console.log('Searching for matches!');

  const queue = await matchmakingService.findInQueue(params);
  const users = queue.map(i => i.user);

  if (users.length === 0) {
    console.log('No users at all :-(')
    return false;
  }

  if (users.length < minPlayers) {
    console.log('Not enough users:', { users });
    console.log('Push bots!');
    return false;
  }

  return createGame(users);
}
