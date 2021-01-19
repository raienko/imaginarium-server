const mongoose = require('mongoose');

const connect = () => mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

module.exports = {
  connect,
};
