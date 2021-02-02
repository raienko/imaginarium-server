const jwt = require('jsonwebtoken');
const moment = require('moment');
const tokenTypes = require('src/modules/token/types');
const { throwError } = require('src/utils');
const Token = require('./Token');

const secret = process.env.JWT_SECRET;

const generateToken = async (userId, type, expires) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret)
};

const saveToken = async (token, userId, type, expires, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    type,
    expires: expires.toDate(),
    blacklisted,
  });
  return tokenDoc;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(process.env.accessExpirationMinutes, 'minutes');
  const accessToken = await generateToken(user, tokenTypes.ACCESS, accessTokenExpires);
  await saveToken(accessToken, user, tokenTypes.ACCESS, accessTokenExpires);

  const refreshTokenExpires = moment().add(process.env.refreshExpirationDays, 'days');
  const refreshToken = await generateToken(user, tokenTypes.REFRESH, refreshTokenExpires);
  await saveToken(refreshToken, user, tokenTypes.REFRESH, refreshTokenExpires);

  return {
    [tokenTypes.ACCESS]: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    [tokenTypes.REFRESH]: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const verifyToken = async (token, type = tokenTypes.ACCESS) => {
  try {
    const payload = jwt.verify(token, secret);
    await Token.find().then(console.log);
    const record = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
    return record
  } catch (err) {
    throwError(`Token verification failed: ${err.message}`, 403);
  }
};

const deleteTokens = async (user) => {
  return Token.remove({ user });
}

const parseToken = (token) => jwt.decode(token, secret);

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  deleteTokens,
  parseToken,
}
