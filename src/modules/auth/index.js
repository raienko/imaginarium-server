const userService = require('src/modules/user');
const tokenService = require('src/modules/token');
const tokenTypes = require('src/modules/token/types');
const passwordService = require('src/modules/passwords');
const matchmakingService = require('src/modules/matchmaking');
const socketsService = require('src/modules/sockets');
const gameService = require('src/modules/game');

const auth = async (username, password) => {
  const user = await userService.findByUsername(username);
  if (user) {
    return login(username, password);
  }
  return register(username, password);
}

const register = async (username, password) => {
  const user = await userService.createUser({ username });
  await passwordService.createPassword(user._id, password);
  return login(username, password);
};

const login = async (username, password) => {
  const user = await userService.findByUsername(username);
  await passwordService.verifyPassword(user._id, password);
  const tokens = await tokenService.generateAuthTokens(user._id);
  return {
    userId: user._id,
    accessToken: tokens[tokenTypes.ACCESS],
    refreshToken: tokens[tokenTypes.REFRESH],
  }
}

const deleteAccount = async (user) => {
  await userService.deleteUser(user);
  await tokenService.deleteTokens(user);
  await passwordService.deletePassword(user);
  await matchmakingService.leaveQueue(user);
  await socketsService.deleteSocket(user);
  return true;
}

module.exports = {
  auth,
  register,
  login,
  deleteAccount,
}
