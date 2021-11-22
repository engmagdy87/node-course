const bcrypt = require('bcrypt');
const User = require('../models/User-no-sql-odm');
// const Book = require('../models/Book');

const getUsers = async (req, res, next) => {
  const users = await User.find()
    .select('-password')
    .populate('books', 'title');
  res.send(users);
};

const getUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate('books', 'title');
  res.send(user);
};

const postUser = async (req, res, next) => {
  const { fullName, username, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = new User({ fullName, username, password: hashedPassword });
    await user.save();
    res.send('User Created');
  } catch (error) {
    res.send('Something went error');
  }
};

const patchUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndUpdate(userId, req.body);
    res.send('User Updated');
  } catch (error) {
    res.send('Something went error');
  }
};

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  await User.findByIdAndRemove(userId);
  res.send('User Deleted');
};

// const loginUser = async (req, res, next) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({
//       where: { username },
//     });
//     if (user) {
//       // check user password with hashed password stored in the database
//       const isValidPassword = await bcrypt.compare(password, user.password);
//       if (isValidPassword) {
//         res.status(200).send({ token: '<TOKEN>' });
//       } else {
//         res.status(400).send({ error: 'Invalid Password' });
//       }
//     } else {
//       res.status(401).send({ error: 'User does not exist' });
//     }
//   } catch (error) {
//     res.send(error);
//     res.send('Something went error');
//   }
// };

const addBookToUser = async (req, res, next) => {
  const { userId, bookId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user) {
      user.books.push(bookId);
      user.save();
      res.send('Book added to User');
    } else throw 'user is not found';
  } catch (error) {
    res.send(error);
    res.send('Something went error');
  }
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  patchUser,
  deleteUser,
  //   loginUser,
  addBookToUser,
};
