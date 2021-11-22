const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const User = require('../models/User');
const Book = require('../models/Book');

const getUsers = async (req, res, next) => {
  const users = await User.findAll({
    includeIgnoreAttributes: false, // remove books array
    include: [
      {
        model: Book,
        through: {
          attributes: [],
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
      include: [
        [Sequelize.fn('COUNT', Sequelize.col('books.id')), 'totalBooks'], // get count of books
      ],
    },
  });
  res.send(users);
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Book,
        through: {
          attributes: [],
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  res.send(user);
};

const postUser = async (req, res, next) => {
  const { fullName, username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    await User.create({ fullName, username, password: hashedPassword });
    res.send('User Created');
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      const { path, value } = error.errors[0];
      if (path === 'username') res.send(`${value} is already exist username`);
      if (path === 'fullName') res.send(`${value} is already exist fullName`);
    }
  }
};

const patchUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const response = await User.update(
      { ...req.body },
      { where: { id: userId } }
    );
    if (response[0]) res.send('User Updated');
    else res.send('User Does not exist');
  } catch (error) {
    res.send(error);
    res.send('Something went error');
  }
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    await User.destroy({ where: { id: userId } });
    res.send('User Deleted');
  } catch (error) {
    res.send(error);
    res.send('Something went error');
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username },
    });
    if (user) {
      // check user password with hashed password stored in the database
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        res.status(200).send({ token: '<TOKEN>' });
      } else {
        res.status(400).send({ error: 'Invalid Password' });
      }
    } else {
      res.status(401).send({ error: 'User does not exist' });
    }
  } catch (error) {
    res.send(error);
    res.send('Something went error');
  }
};

// const addBookToUser = async (req, res, next) => {
//   const { userId, bookId } = req.body;
//   try {
//     const user = await User.findByPk(userId);
//     if (user) {
//       user.addBook(bookId);
//       res.send('Book added to User');
//     } else throw 'user is not found';
//   } catch (error) {
//     res.send(error);
//     res.send('Something went error');
//   }
// };

module.exports = {
  getUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser,
  loginUser,
  // addBookToUser,
};
