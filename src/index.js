const server = require('./server');
const websocket = require('./websocket');
const websocketController = require('./websocketController');

const PORT = process.env.PORT || 3000;

websocket.on('request', websocketController);

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
