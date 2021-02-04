const httpStatus = require('http-status');
const {isDev} = require('src/utils');

const errorResponder = (err, req, res, next) => {
  const isDBError = err.name === 'MongoError';

  const frontendIssue = err.statusCode || isDBError;

  if (isDev) {
    console.log('Middleware caught error:', err.message, err.code)
  }

  if (isDBError) {
    if (err.code === 11000) {
      err.message = 'ALREADY_IN_USE';
    }
  }

  res
    .status(frontendIssue ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR)
    .send({ error: err.message });
};

module.exports = errorResponder;
