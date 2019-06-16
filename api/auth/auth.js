const jwt = require('express-jwt');

const utils = require('./utils');
const config = require('../config/index');

const auth = {
  required: jwt({
    secret: config.secrets.jwt,
    userProperty: 'user',
    getToken: utils.getTokenFromHeaders,
  }),
  optional: jwt({
    secret: config.secrets.jwt,
    userProperty: 'user',
    getToken: utils.getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;
