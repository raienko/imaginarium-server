const extractors = require('src/utils/extractors');
const tokenService = require('src/modules/token');
const { newError } = require('src/utils');

const auth = async (req, res, next) => {
  const token = extractors.extractAuthToken(req);

  if (!token) {
    return next();
  }

  try {
    const payload = tokenService.parseToken(token);

    req.token = token;
    req.user = payload.sub;
  } catch (err) {
    next(newError(err.message, 403))
  }

  return next();
}

module.exports = auth;
