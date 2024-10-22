
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createNewTransaction,
  fetchAllTransactions,
  fetchTransactionById,
  modifyTransaction,
  removeTransactionById
} = require('../controllers/transactionController');
const {getAllCategories} = require('../models/Category')
const { transactionValidators } = require('../utils/validators');

// Middleware for authentication
router.use(auth);

// Route to get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes for transactions
router.post('/', transactionValidators, createNewTransaction);  // Create a transaction
router.get('/', fetchAllTransactions);  // Get all transactions
router.get('/:id', fetchTransactionById);  // Get a specific transaction by ID
router.put('/:id', transactionValidators, modifyTransaction);  // Update a transaction
router.delete('/:id', removeTransactionById);  // Delete a transaction

module.exports = router;
