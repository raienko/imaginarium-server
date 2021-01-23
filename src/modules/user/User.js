const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    character: {
      type: Object,
      unique: false,
      required: false,
    },
    game: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Game',
      unique: true,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', schema);

module.exports = User;
