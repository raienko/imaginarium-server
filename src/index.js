const api = require('./api');
const app = require('./core/app');
const websocket = require('./core/websocket');
const server = require('./core/server');

api(app, websocket);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
