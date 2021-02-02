const { v4: uuidv4 } = require('uuid');

const generateID = () => uuidv4();

const newError = (message, code, data) => {
  const err = new Error(message);
  err.code = code;
  err.data = data;
  return err;
}

const throwError = (message, code, data) => {
  const err = newError(message, code, data);
  throw err;
}

const isDev = process.env.TYPE === 'DEV';

const isProd = process.env.TYPE === 'PROD';


module.exports = {
  generateID,
  newError,
  throwError,
  isDev,
  isProd,
}
