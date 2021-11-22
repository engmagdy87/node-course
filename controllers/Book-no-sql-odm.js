const Book = require('../models/Book-no-sql-odm');

const getBooks = async (req, res, next) => {
  const books = await Book.find();
  res.send(books);
};

const getBook = async (req, res, next) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId);
  res.send(book);
};

const postBook = async (req, res, next) => {
  try {
    const book = new Book({ ...req.body });
    await book.save();
    res.send('Book Created');
  } catch (error) {
    res.send(error);
  }
};

// const patchBook = async (req, res, next) => {
//   const { bookId } = req.params;
//   try {
//     const response = await Book.update(
//       { ...req.body },
//       { where: { id: bookId } }
//     );
//     if (response[0]) res.send('Book Updated');
//     else res.send('Book Does not exist');
//   } catch (error) {
//     res.send(error);
//     res.send('Something went error');
//   }
// };

// const deleteBook = async (req, res, next) => {
//   const { bookId } = req.params;
//   try {
//     await Book.destroy({ where: { id: bookId } });
//     res.send('Book Deleted');
//   } catch (error) {
//     res.send(error);
//     res.send('Something went error');
//   }
// };

module.exports = {
  getBooks,
  getBook,
  postBook,
  //   patchBook,
  //   deleteBook,
};
