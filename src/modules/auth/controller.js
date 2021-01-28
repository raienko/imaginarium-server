const authService = require('./');

const register = async (req, res) => {
  const result = await authService.register(req.body);
  return res.send(result);
};

const login = async (req, res) => {
  const result = await authService.login(req.body.user, req.body.password);
  return res.send(result);
}

const logout = async (req, res) => {
  return res.send('Logout')
}

const deleteAccount = async (req, res) => {
  const result = await authService.deleteAccount(req.body.id);
  return res.send(result);
}

module.exports = {
  register,
  login,
  logout,
  deleteAccount,
}
