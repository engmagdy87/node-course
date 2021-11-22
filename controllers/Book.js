const Book = require('../models/Book');
const User = require('../models/User');

const getBooks = async (req, res, next) => {
  const books = await Book.findAll({
    include: [
      {
        model: User,
        through: {
          attributes: [],
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  res.send(books);
};

const getBook = async (req, res, next) => {
  const { bookId } = req.params;
  const book = await Book.findByPk(bookId);
  res.send(book);
};

const postBook = async (req, res, next) => {
  const { title, author, userId } = req.body;
  try {
    const user = await User.findByPk(userId);
    user.createBook({ title, author });
    res.send('Book Created for user ' + userId);
  } catch (error) {
    res.send(error);
  }
};

const patchBook = async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const response = await Book.update(
      { ...req.body },
      { where: { id: bookId } }
    );
    if (response[0]) res.send('Book Updated');
    else res.send('Book Does not exist');
  } catch (error) {
    res.send(error);
    res.send('Something went error');
  }
};

const deleteBook = async (req, res, next) => {
  const { bookId } = req.params;
  try {
    await Book.destroy({ where: { id: bookId } });
    res.send('Book Deleted');
  } catch (error) {
    res.send(error);
    res.send('Something went error');
  }
};

module.exports = {
  getBooks,
  getBook,
  postBook,
  patchBook,
  deleteBook,
};
