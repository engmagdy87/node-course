const UserNoSqlController = require('../controllers/User-no-sql');
const express = require('express');
const router = express.Router();

router.get('/users', UserNoSqlController.getUsers);

router.get('/user/:userId', UserNoSqlController.getUser);

router.post('/user', UserNoSqlController.postUser);

// router.post('/login', UserNoSqlController.loginUser);

router.patch('/user/:userId', UserNoSqlController.patchUser);

router.delete('/user/:userId', UserNoSqlController.deleteUser);

module.exports = router;
