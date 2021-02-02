const userService = require('./');

const fetchUser = async (req, res) => {
  const profile = await userService.fetchUser(req.user);
  return res.send(profile);
};

const createUser = async (req, res) => {
  const profile = await userService.createUser(req.body);
  return res.send(profile);
};

const updateUser = async (req, res) => {
  console.log(req.user, req.body);
  const profile = await userService.updateUser(req.user, req.body);
  return res.send(profile);
}

const deleteUser = async (req, res) => {
  const success = await userService.deleteUser(req.user);
  return res.send(success);
};

module.exports = {
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
}
