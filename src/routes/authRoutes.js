
// module.exports = router;
const express = require('express');
const router = express.Router();
const { userValidators, loginValidators } = require('../utils/validators');
const { register, login } = require('../controllers/authController');

// Registration route with validation
router.post('/register', userValidators, register);

// Login route with validation
router.post('/login', loginValidators, login);

module.exports = router;
