const socketsController = require('../modules/sockets/controller');
const authController = require('../modules/auth/controller');
const systemController = require('../modules/system/controller');
const usersController = require('../modules/user/controller');
const gamesController = require('../modules/game/controller');
const matchmakingController = require('../modules/matchmaking/controller');
const tokenController = require('../modules/token/controller');

const auth = require('src/middlewares/auth');
const catchError = require('src/middlewares/catchError');
const errorResponder = require('src/middlewares/errorResponder');

const setupRestApi = (app) => {

    app.use('*', auth);

// System

    app.get('/ping', systemController.ping);

// Auth

    app.post('/auth', catchError(authController.auth));
    app.post('/auth/logout', catchError(authController.logout));
    app.delete('/auth', catchError(authController.deleteAccount));

// Token

    app.post('token/verify', catchError(tokenController.verifyToken));
    app.get('token/refresh', catchError(tokenController.refreshToken));

// User

    app.get('/user', catchError(usersController.fetchUser));
    app.post('/user', catchError(usersController.updateUser));

// Matchmaking

    app.post('/matchmaking', catchError(matchmakingController.joinQueue));
    app.delete('/matchmaking', catchError(matchmakingController.leaveQueue));

// Games

    app.put('/game', catchError(gamesController.createGame));
    app.get('/game', catchError(gamesController.fetchGame));
    app.post('/game', catchError(gamesController.playCard));
    app.post('/game/leave', catchError(gamesController.leaveGame));

    app.use(errorResponder)
}

const setupSocketsApi = (websocket) => {
    websocket.on('request', socketsController);
}

module.exports = {
  setupRestApi,
  setupSocketsApi,
}
