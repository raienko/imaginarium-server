const gameService = require('src/modules/game');
const socketService = require('src/modules/sockets');
const userService = require('src/modules/user');
const Queue = require('./Queue');

const joinQueue = async (user, filters) => {
  const queue = new Queue({ user, ...filters });
  await queue.save();
  console.log(`${user} joined queue!`);
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
  const queue = await Queue.find();
  queue.map(i => socketService.sendMessage(i.user, {
    type: 'queue_cancelled',
    message: 'Queue cancelled',
  }));
  return Queue.collection.drop();
};

const match = async (users) => {
  console.log('Matching: ', users);
  const game = await gameService.createGame({ users });
  console.log('Game created!', game._id);
  await userService.updateMultiple(users, { game: game._id });
  await socketService.createRoom(game._id, users);
  console.log('Room created!');
  await removeFromQueue(users);
  console.log('Queue cleaned');
  await socketService.sendRoomMessage(game._id, {
    type: 'game_created',
    game: game._id,
  });
  console.log('Messages sent');
}

const findMatches = async () => {
  console.log('Searching for matches!');

  const queue = await Queue.find().limit(5);
  const users = queue.map(i => i.user);

  if (users.length === 0) {
    console.log('No users at all :-(')
    return false;
  }

  if (users.length < 3) {
    console.log('Not enough users:', { users });
    console.log('Push bots!');
    return false;
  }

  console.log('Matched!')
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
