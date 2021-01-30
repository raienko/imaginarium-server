const express = require('express');
const { errorHandler } = require('src/utils/error');
const app = express();

// parse json request body
app.use(express.json());

// handle error
app.use(errorHandler);

module.exports = app;
