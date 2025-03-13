const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUser);

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/me', userController.getUserProfile);

module.exports = router;