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

    app.post('/auth', authController.register);
    app.post('/auth/login', authController.login);
    app.post('/auth/logout', authController.logout);
    app.delete('/auth', authController.logout);

// Users

    app.get('/users/:userId', usersController.fetchUser);
    app.post('/users', usersController.createUser);
    app.put('/users', usersController.updateUser);
    app.delete('/users', usersController.deleteUser);

// Queue

    app.post('/queue', queueController.joinQueue);
    app.delete('/queue', queueController.leaveQueue);

// Games

    app.get('/game', gamesController.createGame);
    app.post('/game', gamesController.createGame);
    app.put('/game', gamesController.updateGame);
    app.delete('/game', gamesController.deleteGame);
}

const setupSocketsApi = (websocket) => {
    websocket.on('request', socketsController);
}

module.exports = {
  setupRestApi,
  setupSocketsApi,
}
