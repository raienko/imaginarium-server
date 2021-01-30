const socketsController = require('../modules/sockets/controller');
const authController = require('../modules/auth/controller');
const systemController = require('../modules/system/controller');
const usersController = require('../modules/user/controller');
const gamesController = require('../modules/game/controller');
const matchmakingController = require('../modules/matchmaking/controller');
const tokenController = require('../modules/token/controller');

const setupRestApi = (app) => {

// System

    app.get('/ping', systemController.ping);

// Auth

    app.post('/auth', authController.auth);
    app.post('/auth/logout', authController.logout);
    app.delete('/auth', authController.deleteAccount);

// Token

    app.post('token/verify', tokenController.verifyToken);
    app.get('token/refresh', tokenController.refreshToken);

// User

    app.get('/user', usersController.fetchUser);
    app.post('/user', usersController.updateUser);

// Queue

    app.post('/queue', matchmakingController.joinQueue);
    app.delete('/queue', matchmakingController.leaveQueue);

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
