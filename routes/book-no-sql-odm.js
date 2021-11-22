const BookNoSqlODMController = require('../controllers/Book-no-sql-odm');
const express = require('express');
const router = express.Router();

router.get('/books', BookNoSqlODMController.getBooks);

router.get('/book/:bookId', BookNoSqlODMController.getBook);

router.post('/book', BookNoSqlODMController.postBook);

// router.patch('/book/:bookId', BookNoSqlODMController.patchBook);

// router.delete('/book/:bookId', BookNoSqlODMController.deleteBook);

module.exports = router;
