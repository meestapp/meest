/* eslint-disable func-names */
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const config = require('../config/index');

const { Schema } = mongoose;

const userSchema = new Schema({
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
  salt: {
    type: String,
    select: false,
  },
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  team: {
    type: String,
  },
  salary: {
    type: Number,
    select: false,
  },
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.password === hash;
};

userSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    // eslint-disable-next-line no-underscore-dangle
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, config.secrets.jwt);
};

userSchema.methods.toAuthJSON = function () {
  return {
    // eslint-disable-next-line no-underscore-dangle
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model('User', userSchema);
