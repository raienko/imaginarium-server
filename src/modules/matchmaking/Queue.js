const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    group: String,
    locales: [String],
    rating: Number,
  },
  { timestamps: true },
);

const Queue = mongoose.model('Queue', schema);

module.exports = Queue;
