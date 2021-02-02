const Queue = require('./Queue');

const joinQueue = async (users, filters) => {
  const request = new Queue({ users, filters });
  await request.save();
  return true;
}

const leaveQueue = async (users) => {
  return Queue.deleteOne({ users })
}

const checkQueue = async () => {

};

const clearQueue = async () => {

};

module.exports = {
  leaveQueue,
  joinQueue,
  checkQueue,
  clearQueue,
}
