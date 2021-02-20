const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
      users: Array,
      game: String,
  },
);

const Room = mongoose.model('Room', schema);

module.exports = Room;
