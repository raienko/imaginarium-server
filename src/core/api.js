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

    app.post('/auth/register', authController.register);
    app.post('/auth/login', authController.login);
    app.post('/auth/logout', authController.logout);
    app.delete('/auth', authController.removeAccount);

// User

    app.get('/user', usersController.fetchUser);
    app.post('/user', usersController.updateUser);

// Queue

    app.post('/queue', queueController.joinQueue);
    app.delete('/queue', queueController.leaveQueue);

// Games

    app.get('/game', gamesController.fetchGame);
    app.put('/game', gamesController.createGame);
    app.post('/game', gamesController.updateGame);
    app.post('/game/leave', gamesController.leaveGame);
}

const setupSocketsApi = (websocket) => {
    websocket.on('request', socketsController);
}

module.exports = {
  setupRestApi,
  setupSocketsApi,
}
