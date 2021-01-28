const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    players: [String],
    turn: String,
    association: String,
    flop: [{id: String, owner: String}],
    deck: [{id: String, owner: String}],
  },
  { timestamps: true },
);

const Game = mongoose.model('Game', schema);

module.exports = Game;
