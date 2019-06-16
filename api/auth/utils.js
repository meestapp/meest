const jwt = require('jsonwebtoken');

const config = require('../config/index');
const User = require('../Models/User.model');

const utils = {
  getTokenFromHeaders: (req) => {
    const { headers: { authorization } } = req;

    if (authorization && authorization.split(' ')[0] === 'Bearer') {
      return authorization.split(' ')[1];
    }
    return null;
  },
  getUserByToken: async (token) => {
    try {
      const decoded = jwt.verify(token, config.secrets.jwt);
      const user = await User.findById(decoded.id);
      return user;
    } catch (e) {
      throw e;
    }
  },
};

module.exports = utils;
