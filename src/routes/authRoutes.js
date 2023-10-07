// authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User registration
router.post('/register', authController.register);

// User log in
router.post('/login', authController.login);
// User log out
router.post('/logout', authController.logout);

module.exports = router;