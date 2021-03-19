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
  return Queue.collection.drop();
};

const findInQueue = async (params, limit = 5) => {
  return Queue.find(params).limit(limit)
}

module.exports = {
  leaveQueue,
  joinQueue,
  checkQueue,
  clearQueue,
  removeFromQueue,
  findInQueue,
}
