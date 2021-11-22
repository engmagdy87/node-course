// module.exports =
const Sequelize = require('sequelize');
const db = require('../utils/database');
const User = require('./User');
const UserBook = require('./UserBook');

const Book = db.define('book', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Book;
