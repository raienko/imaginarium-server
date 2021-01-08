const originIsAllowed = (origin) => {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

const getRequestHeaders = (request) => {
  const symbol = Object.getOwnPropertySymbols(request.httpRequest)[1];
  return request.httpRequest[symbol];
}

const extractUserId = (authorizationToken) => authorizationToken;

let connections = [];

const controller = (request) => {
  const headers = getRequestHeaders(request);
  const authorizationToken = headers.authorization;
  const userId = extractUserId(authorizationToken);

  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log(`${userId} connection from "${request.origin}" origin rejected.`);
    return;
  }

  const connection = request.accept('echo-protocol', request.origin);
  console.log(`${userId} connected`);

  connections.push({
    userId,
    connection,
  });

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      const event = JSON.parse(message.utf8Data);
      console.log(`${userId} sent ${event.type}: ` + event.data);
      connection.sendUTF(message.utf8Data);
    } else if (message.type === 'binary') {
      console.log(`${userId} sent file of ` + message.binaryData.length + ' bytes');
      connection.sendBytes(message.binaryData);
    }
  });

  connection.on('close', function(reasonCode, description) {
    console.log(`${userId} disconnected: ${reasonCode}`);
  });
}

module.exports = controller;
