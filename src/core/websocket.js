const ws = require('websocket');
const server = require('./server');

const websocket = new ws.server({
  httpServer: server,
  autoAcceptConnections: false,
});

module.exports = websocket;
