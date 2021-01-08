const server = require('./server');
const WebsocketServer = require('websocket').server;

const websocket = new WebsocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

module.exports = websocket;
