const Sequelize = require('sequelize');
const config = require('../config/config.json');

const env = process.env.NODE_ENV || 'development';

const { username, password, database, host, dialect } = config[env];

const db = new Sequelize(database, username, password, {
  dialect,
  host,
  logging: false,
});

module.exports = db;
