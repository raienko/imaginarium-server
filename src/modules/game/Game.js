const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    users: Array,
    turn: String,
    cards: Array,
    deck: Array,
    association: String,
  },
  { timestamps: true },
);

const Game = mongoose.model('Game', schema);

module.exports = Game;
