const UserNoSqlODMController = require('../controllers/User-no-sql-odm');
const express = require('express');
const router = express.Router();

router.get('/users', UserNoSqlODMController.getUsers);

router.get('/user/:userId', UserNoSqlODMController.getUser);

router.post('/user', UserNoSqlODMController.postUser);

// router.post('/login', UserNoSqlODMController.loginUser);

router.patch('/user/:userId', UserNoSqlODMController.patchUser);

router.delete('/user/:userId', UserNoSqlODMController.deleteUser);

router.post('/user/book', UserNoSqlODMController.addBookToUser);

module.exports = router;
