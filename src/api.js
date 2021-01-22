const socketsController = require('./controllers/sockets');
const coreController = require('./controllers/core');
const usersController = require('./controllers/users');
const gamesController = require('./controllers/games');
const queueController = require('./controllers/queue');

const setupRestApi = (app) => {
// Core

    app.get('/ping', coreController.ping);

// Users

    app.get('/users/:userId', usersController.fetchUser);
    app.post('/users', usersController.createUser);
    app.put('/users', usersController.updateUser);
    app.delete('/users', usersController.deleteUser);

// Queue

    app.post('/queue', queueController.joinQueue);
    app.delete('/queue', queueController.leaveQueue);

// Games

    app.post('/games', gamesController.createGame);
    app.put('/games', gamesController.updateGame);
    app.delete('/games', gamesController.deleteGame);
}

const setupSocketsApi = (websocket) => {
  websocket.on('request', socketsController);
}

module.exports = {
  setupRestApi,
  setupSocketsApi,
}
