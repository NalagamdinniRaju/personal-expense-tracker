const { body } = require('express-validator');

// Transaction validation rules

const transactionValidators = [
  body('type').isIn(['income', 'expense'])
    .withMessage('Type must be either income or expense'),
  body('amount').isFloat({ min: 0.01 })
    .withMessage('Amount must be a positive number'),
  body('category_id').isInt({ min: 1 })
    .withMessage('Valid category ID is required'),
  body('description').optional().isString()
    .withMessage('Description must be a string')
];

// User registration validation rules
const userValidators = [
  body('email').isEmail()
    .withMessage('Valid email is required'),
  body('password').isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// User login validation rules
const loginValidators = [
  body('email').isEmail()
    .withMessage('Valid email is required'),
  body('password').exists()
    .withMessage('Password is required')
];

module.exports = {
  transactionValidators,
  userValidators,
  loginValidators
};