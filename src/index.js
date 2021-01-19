const api = require('./api');
const app = require('./core/app');
const websocket = require('./core/websocket');
const server = require('./core/server');
const database = require('./core/database');

database
  .connect()
  .then(async () => {
    api.setupSocketsApi(websocket);
    api.setupRestApi(app)

    const PORT = process.env.PORT;
    server.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => {
    console.log('Failed to start server: ', err.message);
  });
