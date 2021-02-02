const httpStatus = require('http-status');
const {isDev} = require('src/utils');

const errorResponder = (err, req, res, next) => {
  if (isDev) {
    console.log('Middleware caught error:', err.message, err.code)
  }

  res
    .status(err.code || httpStatus.INTERNAL_SERVER_ERROR)
    .send({
      code: err.code,
      message: err.message,
    });

  next(err)
};

module.exports = errorResponder;
