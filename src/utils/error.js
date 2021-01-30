const httpStatus = require('http-status');
const {isDev, isProd} = require('src/utils');

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (isProd && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(isDev && { stack: err.stack }),
  };

  if (isDev) {
    console.log(`Error: ${err.message}`);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorHandler
};
