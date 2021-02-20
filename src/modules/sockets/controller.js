const tokenService = require('src/modules/token');
const errors = require('src/config/errors');
const socketsService = require('./index');

const getRequestHeaders = (request) => {
  const symbol = Object.getOwnPropertySymbols(request.httpRequest)[1];
  return request.httpRequest[symbol];
}

const controller = async (request) => {
  const headers = getRequestHeaders(request);
  const token = headers.authorization;
  if (!token) {
    return request.reject(errors.authorizationRequired);
  }

  const payload = tokenService.parseToken(token);

  if (!payload) {
    return request.reject(errors.invalidToken);
  }

  const { user } = payload;

  const connection = request.accept('echo-protocol', request.origin);
  console.log(`${user} connected`);

  socketsService.addConnection(user, connection);

  connection.on('message', function(message) {
    if (message.type !== 'utf8') {
      console.log('Wrong message format: ', message);
      return socketsService.cancelConnection(user, connection);
    }

    const event = JSON.parse(message.utf8Data);
    console.log(`${user} sent ${event.type}: ` + event.data);
    socketsService.sendMessage(user, event);
  });

  connection.on('close', function(reasonCode) {
    console.log(`${user} disconnected: ${reasonCode}`);
    socketsService.cancelConnection(user, connection);
  });
}

module.exports = controller;
