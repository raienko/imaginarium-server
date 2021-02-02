const User = require('./User');

const createUser = async (params) => {
  const user = new User(params);
  await user.save();
  return user;
}

const fetchUser = async (id) => {
  return User.findById(id);
}

const findByUsername = async (username) => {
  return User.findOne({ username });
}

const updateUser = async (id, params) => {
  const user = await User.findByIdAndUpdate(id, {params}, {returnOriginal: false});
  return user;
}

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
}


module.exports = {
  createUser,
  fetchUser,
  findByUsername,
  updateUser,
  deleteUser
}
