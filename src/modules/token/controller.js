const refreshToken = async (req, res) => {
  return res.send(true);
};

const verifyToken = async (req, res) => {
  return res.send(true);
};

module.exports = {
  verifyToken,
  refreshToken,
}
