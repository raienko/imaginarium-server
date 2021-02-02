const express = require('express');
const errorResponder = require('src/middlewares/errorResponder');

const app = express();

// parse json request body
app.use(express.json());

app.use(errorResponder);

module.exports = app;
