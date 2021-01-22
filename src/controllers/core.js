const ping = (req, res) => {
  return res.send({ message: 'pong' });
};

module.exports = {
  ping,
}
