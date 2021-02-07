const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    players: [String],
    turn: String,
    association: String,
    flop: [],
    deck: [],
  },
  { timestamps: true },
);

const Game = mongoose.model('Game', schema);

module.exports = Game;
