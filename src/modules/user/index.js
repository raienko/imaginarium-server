const User = require('./User');

const createUser = async (params) => {
  const user = new User(params);
  await user.save();
  return user;
}

const updateUser = async (id, params) => {
  const user = User.findOneAndUpdate({id}, {params}, {returnOriginal: false});
  return user;
}


module.exports = {
  createUser,
  updateUser,
}
