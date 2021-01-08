const fetchUser = (req, res) => {
  return res.send('User added')
};

const createUser = (req, res) => {
  return res.send('User added')
};

const updateUser = (req, res) => {
  return res.send('User updated')
}

const deleteUser = (req, res) => {
  return res.send('User removed')
};

module.exports = {
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
}
