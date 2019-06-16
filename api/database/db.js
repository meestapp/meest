const mongoose = require('mongoose');
const config = require('../config/index');

const mongoConfig = config.database;

class Database {
  constructor() {
    this.db = mongoose.connection;
    this.connectionUrl = `
      mongodb://${mongoConfig.user}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.name}?authSource=${mongoConfig.authDb}
    `;
  }

  async connect() {
    mongoose.connect(this.connectionUrl, { useNewUrlParser: true });
    this.db.on('error', e => new Error('Error openning connection to db: ', e));
    this.db.once('open', () => true);
  }
}

module.exports = Database;
