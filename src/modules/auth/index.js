const userService = require('src/modules/user');
const tokenService = require('src/modules/token');
const passwordService = require('src/modules/passwords');
const queueService = require('src/modules/queue');
const socketsService = require('src/modules/sockets');
const gameService = require('src/modules/game');

const register = async (params) => {
  const user = await userService.createUser(params);
  const tokens = await tokenService.generateAuthTokens(user._id);
  return {
    user,
    tokens,
  };
};

const login = async (username, password) => {
  const user = await userService.findByUsername(username);
  await passwordService.verifyPassword(user._id, password);
  const tokens = tokenService.generateAuthTokens(user._id);
  return {
    user,
    tokens,
  }
}

const deleteAccount = async (user) => {
  await userService.deleteUser(user);
  await tokenService.deleteTokens(user);
  await passwordService.deletePassword(user);
  await queueService.leaveQueue(user);
  await socketsService.deleteSocket(user);
  return true;
}

module.exports = {
  register,
  login,
  deleteAccount,
}
