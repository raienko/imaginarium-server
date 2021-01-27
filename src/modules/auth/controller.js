const auth = require('./');

const register = async (req, res) => {
  await auth.login();
  return res.send('registered')
};

const login = async (req, res) => {
  const user = {};
  await auth.login();
  return res.send('Login')
}

const logout = async (req, res) => {
  return res.send('Logout')
}

const removeAccount = async (req, res) => {
  return res.send('Removed');
}

module.exports = {
  register,
  login,
  logout,
  removeAccount,
}
