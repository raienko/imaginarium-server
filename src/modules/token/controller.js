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
  const accessToken = generateToken(user.id, tokenTypes.ACCESS, accessTokenExpires);

  const refreshTokenExpires = moment().add(process.env.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, tokenTypes.REFRESH, refreshTokenExpires);
  await saveToken(refreshToken, user.id, tokenTypes.REFRESH, refreshTokenExpires);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, secret);
  const record = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!record) {
    throwError('Token not found');
  }
  return record;
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
}
