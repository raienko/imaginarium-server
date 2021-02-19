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

const nextIndex = (index, arr) => {
  return (index + 1) % arr.length;
}

const prevIndex = (index, arr) => {
  const previous = index - 1;
  return previous < 0 ? arr.length - 1 : previous;
}


module.exports = {
  generateID,
  newError,
  throwError,
  isDev,
  isProd,
  nextIndex,
  prevIndex,
}
