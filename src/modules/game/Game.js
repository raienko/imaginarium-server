const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    id: String,
    players: [{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    }],
    turn: String,
    association: String,
    flop: [{id: String, owner: String}],
    deck: [{id: String, owner: String}],
  },
  { timestamps: true },
);

const Game = mongoose.model('Game', schema);

module.exports = Game;
