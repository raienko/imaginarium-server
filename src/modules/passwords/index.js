const Password = require('./Password');

const createPassword = async (user, password) => {
  const record = new Password({ user, password });
  await record.save();
  return true;
};

const updatePassword = async (user, currentPassword, newPassword ) => {
  await Password.findOneAndUpdate({ user, password: currentPassword }, { password: newPassword });
  return true;
};

const verifyPassword = async (user, password) => {
  const record = await Password.findOne({ user, password });
  return !!record;
};

const deletePassword = async (user, password) => {
  return Password.findOneAndDelete({user, password});
};

module.exports = {
  createPassword,
  updatePassword,
  verifyPassword,
  deletePassword,
}
