const Queue = require('./Queue');
const gameService = require('src/modules/game');

const joinQueue = async (user, filters) => {
  const queue = new Queue({ user, ...filters });
  await queue.save();
  return true;
}

const leaveQueue = async (user) => {
  return Queue.deleteOne({ user });
}

const checkQueue = async (user) => {
  return Queue.findOne({ user });
};

const removeFromQueue = async (users) => {
  return Queue.deleteMany({ user: {$in: users}});
}

const clearQueue = async () => {
  // ping all users that queue canceled
  return Queue.collection.drop();
};

const match = async (users) => {
  const game = await gameService.createGame({ users });
  await removeFromQueue(users);
  // notify users game.id
}

const findMatches = async () => {
  console.log('Finding matches!');
  const queue = await Queue.find().limit(5);
  const users = queue.map(i => i.user);

  if (users.length === 0) {
    console.log('No users at all :-(')
    return false;
  }

  if (users.length < 4) {
    console.log('Not enough users:', { users });
    console.log('Push bots!');
  }

  return match(users);
}

module.exports = {
  leaveQueue,
  joinQueue,
  checkQueue,
  clearQueue,
  removeFromQueue,
  match,
  findMatches,
}
