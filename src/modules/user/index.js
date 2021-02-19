const User = require('./User');

const createUser = async (params) => {
  const user = new User(params);
  await user.save();
  return user;
}

const fetchUser = async (_id) => {
  return User.findOne({ _id });
}

const findUsers = async (users) => {
  return User.find({ _id: { $in: users } });
}

const findByUsername = async (username) => {
  return User.findOne({ username });
}

const updateUser = async (_id, update) => {
  return User.findOneAndUpdate({ _id }, update, { new: true });
}

const deleteUser = async (_id) => {
  return User.deleteOne({ _id });
}


module.exports = {
  createUser,
  fetchUser,
  findByUsername,
  updateUser,
  deleteUser,
  findUsers,
}
