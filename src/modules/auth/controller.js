const register = (req, res) => {
  return res.send('registered')
};

const login = (req, res) => {
  const user = {};
  return res.send('Login')
}

const logout = (req, res) => {
  return res.send('Logout')
}

module.exports = {
  register,
  login,
  logout,
}
