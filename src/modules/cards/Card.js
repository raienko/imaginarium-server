const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    image: String,
    animation: String,
    associations: [],
    user: String,
  },
  { timestamps: false },
);

const Card = mongoose.model('Card', schema);

module.exports = Card;
