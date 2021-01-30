const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
      user: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'User',
          unique: true,
          required: true,
      },
      password: {
          type: String,
          unique: false,
          required: true,
      }
  },
  { timestamps: false },
);

const Password = mongoose.model('Password', schema);

module.exports = Password;
