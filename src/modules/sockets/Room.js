const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
      users: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
      }],
      game: String,
  },
);

const Room = mongoose.model('Room', schema);

module.exports = Room;
