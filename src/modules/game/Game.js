const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    users: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    }],
    turn: String,
    cards: Array,
    deck: Array,
    association: String,
  },
  { timestamps: true },
);

const Game = mongoose.model('Game', schema);

module.exports = Game;
