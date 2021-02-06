const matchmakingService = require('./');

const joinQueue = async (req, res) => {
  await matchmakingService.joinQueue(req.user, req.body.filters);
  return res.send(true);
};

const leaveQueue = async (req, res) => {
  await matchmakingService.leaveQueue(req.user);
  return res.send(true);
};

module.exports = {
  joinQueue,
  leaveQueue,
}
