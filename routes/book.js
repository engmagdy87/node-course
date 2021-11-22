const BookController = require('../controllers/Book');
const express = require('express');
const router = express.Router();

router.get('/books', BookController.getBooks);

router.get('/book/:bookId', BookController.getBook);

router.post('/book', BookController.postBook);

router.patch('/book/:bookId', BookController.patchBook);

router.delete('/book/:bookId', BookController.deleteBook);

module.exports = router;
