const socketsController = require('../modules/sockets/controller');
const authController = require('../modules/auth/controller');
const systemController = require('../modules/system/controller');
const usersController = require('../modules/user/controller');
const gamesController = require('../modules/game/controller');
const queueController = require('../modules/queue/controller');

const setupRestApi = (app) => {

// System

    app.get('/ping', systemController.ping);

// Auth

    app.post('/register', authController.register);
    app.post('/login', authController.login);
    app.post('/logout', authController.logout);

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
