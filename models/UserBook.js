const Sequelize = require('sequelize');
const db = require('../utils/database');

const UserBook = db.define('userBook', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
});

module.exports = UserBook;
