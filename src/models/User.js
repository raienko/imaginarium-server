const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    token: {
      type: String,
      unique: true,
      required: true,
    },
    gameId: {
      type: String,
      unique: false,
      required: false,
    }
  },
  { timestamps: true },
);

userSchema.statics.findByToken = async function (token) {
  return this.findOne({token});
};

userSchema.statics.findById = async function (id) {
  return this.findOne({id});
};

const User = mongoose.model('User', userSchema);

module.exports = User;
