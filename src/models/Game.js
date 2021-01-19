const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    id: String,
    players: [String],
    turn: String,
    association: String,
    flop: [{id: String, owner: String}],
    deck: [{id: String, owner: String}],
  },
  { timestamps: true },
);

gameSchema.statics.findById = async function (id) {
  return this.findOne({id});
};

gameSchema.statics.findByMemberId = async function (memberId) {
  return this.findOne({});
};

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
