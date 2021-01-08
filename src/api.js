const socketsController = require('./controllers/sockets');
const usersController = require('./controllers/users');
const gamesController = require('./controllers/games');
const queueController = require('./controllers/queue');

module.exports = (app, websocket) => {
  websocket.on('request', socketsController);

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
