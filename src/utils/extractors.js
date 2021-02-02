const headers = require('src/config/headers');

const extractAuthToken = (request) => {
  const tokenFromHeader = request.headers[headers.authorization];
  const tokenFromBody = request.body.token;
  return tokenFromHeader || tokenFromBody;
}

module.exports = {
  extractAuthToken,
}
