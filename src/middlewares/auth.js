const extractors = require('src/utils/extractors');
const tokenService = require('src/modules/token');

const auth = async (req, res, next) => {
  const token = extractors.extractAuthToken(req);
  if (!token) {
    return next();
  }

  try {
    const payload = tokenService.parseToken(token);
    req.token = token;
    req.user = payload.user;
  } catch (err) {
    console.log('Failed to parse token: ', err.message);
  }

  return next();
}

module.exports = auth;
