const tokenService = require('src/modules/token');

const originIsAllowed = (origin) => {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

const getRequestHeaders = (request) => {
  const symbol = Object.getOwnPropertySymbols(request.httpRequest)[1];
  return request.httpRequest[symbol];
}

let connections = [];

const controller = async (request) => {
  const headers = getRequestHeaders(request);
  const token = headers.authorization;
  if (!token) {
    console.log('No token!');
    return request.reject('No auth token');
  }

  const payload = tokenService.parseToken(token);

  if (!payload) {
    console.log('Invalid token!');
    return request.reject('Invalid token');
  }

  const { user } = payload;

  if (!originIsAllowed(request.origin)) {
    console.log(`${user} connection from "${request.origin}" origin rejected.`);
    return request.reject();
  }

  const connection = request.accept('echo-protocol', request.origin);
  console.log(`${user} connected`);

  connections.push({
    user,
    connection,
  });

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      const event = JSON.parse(message.utf8Data);
      console.log(`${user} sent ${event.type}: ` + event.data);
      connection.sendUTF(message.utf8Data);
    } else if (message.type === 'binary') {
      console.log(`${user} sent file of ` + message.binaryData.length + ' bytes');
      connection.sendBytes(message.binaryData);
    }
  });

  connection.on('close', function(reasonCode, description) {
    console.log(`${user} disconnected: ${reasonCode}`);
  });
}

module.exports = controller;
