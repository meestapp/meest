/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable global-require */
require('./auth/passport');

const bodyParser = require('body-parser');
const express = require('express');

const Database = require('./database/db');

const app = express();
const db = new Database();

const start = async () => {
  await db.connect();
  require('./Models/User.model');
  require('./Models/Meeting.model'),
  require('./Models/Organization.model');
  app.use(bodyParser.json());
  require('./routes.js')(app); // eslint-disable-line
};

start();

module.exports = {
  path: '/api',
  handler: app,
};
