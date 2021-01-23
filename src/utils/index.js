const { v4: uuidv4 } = require('uuid');

const generateID = () => uuidv4();

const throwError = (message, code, data) => {
  const err = new Error(message);
  err.code = code;
  err.data = data;
  throw err;
}

module.exports = {
  generateID,
  throwError,
}
