const authService = require('./');

const auth = async (req, res) => {
  const { username, password } = req.body;
  const result = await authService.auth(username, password);
  return res.send(result);
};

const logout = async (req, res) => {
  return res.send('Logout')
}

const deleteAccount = async (req, res) => {
  const result = await authService.deleteAccount(req.body.id);
  return res.send(result);
}

module.exports = {
  auth,
  logout,
  deleteAccount,
}
