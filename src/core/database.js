const mongoose = require('mongoose');

const connect = () => mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

module.exports = {
  connect,
};
