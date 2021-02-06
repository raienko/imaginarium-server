const api = require('./core/api');
const app = require('./core/app');
const jobs = require('./core/jobs');
const websocket = require('./core/websocket');
const server = require('./core/server');
const database = require('./core/database');

const PORT = process.env.PORT;

database
  .connect()
  .then(() => {
    api.setupSocketsApi(websocket);
    api.setupRestApi(app)
    jobs.start();
    server.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => {
    console.log('Failed to start server: ', err.message);
  });
