const jwt = require('jsonwebtoken');

const config = require('../config/index');
const User = require('../Models/User.model');

const utils = {
  getUserByToken: async (token) => {
    try {
      const decoded = jwt.verify(token, config.secrets.jwt);
      const user = await User.findById(decoded.id);
      return user;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
};

module.exports = utils;
