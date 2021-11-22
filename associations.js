const User = require('./models/User');
const Book = require('./models/Book');
const UserBook = require('./models/UserBook');

const setAssociations = () => {
  User.belongsToMany(Book, { through: UserBook });
  Book.belongsToMany(User, { through: UserBook });
};

module.exports = setAssociations;
