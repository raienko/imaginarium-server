const originIsAllowed = (origin) => {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

const getRequestHeaders = (request) => {
  const symbol = Object.getOwnPropertySymbols(request.httpRequest)[1];
  return request.httpRequest[symbol];
}

module.exports = (request) => {
  const headers = getRequestHeaders(request);
  const authorizationToken = headers.authorization;
  console.log({ authorizationToken });
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }

  const connection = request.accept('echo-protocol', request.origin);
  console.log((new Date()) + ' Connection accepted.');

  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data);
      connection.sendUTF(message.utf8Data);
    }
    else if (message.type === 'binary') {
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
      connection.sendBytes(message.binaryData);
    }
  });

  connection.on('close', function(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
};
