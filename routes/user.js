const UserController = require('../controllers/User');
const express = require('express');
const router = express.Router();

router.get('/users', UserController.getUsers);

router.get('/user/:userId', UserController.getUser);

router.post('/user', UserController.postUser);

router.post('/login', UserController.loginUser);

router.patch('/user/:userId', UserController.patchUser);

router.delete('/user/:userId', UserController.deleteUser);

module.exports = router;
