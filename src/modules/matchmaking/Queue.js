const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    users: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        unique: true,
        required: true,
    }],
    locales: [String],
    rating: Number,
  },
  { timestamps: true },
);

const Queue = mongoose.model('Match', schema);

module.exports = Queue;
