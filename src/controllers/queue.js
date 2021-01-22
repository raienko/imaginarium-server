let queue = [];
let ranked = [];

const joinQueue = (req, res) => {
  console.log('User joined queue');
  // is already in queue?
  // if queue has 5 or more players - create game immediately and notify all players
  // else - add user to the queue
  const userId = Date.now();
  queue.push(userId)
  return res.send(true);
};

const leaveQueue = (req, res) => {
  console.log('User left queue')
  const userId = Date.now();
  queue = queue.filter(i => i !== userId);
  return res.send(true);
};

module.exports = {
  joinQueue,
  leaveQueue,
}
