
const {
  createTransaction,
  findTransactionsByUserId,
  countTransactionsByUserId,
  findTransactionById,
  updateTransaction,
  deleteTransaction
} = require('../models/Transaction'); // Importing all required functions from the model
const { validationResult } = require('express-validator');

// Create a new transaction
const createNewTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, category_id, amount, description } = req.body;
    const user_id = req.user.id;

    const transactionId = await createTransaction({
      user_id,
      type,
      category_id,
      amount,
      description
    });

    const transaction = await findTransactionById(transactionId, user_id);

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all transactions with pagination
const fetchAllTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const user_id = req.user.id;

    const transactions = await findTransactionsByUserId(user_id, page, limit);
    const total = await countTransactionsByUserId(user_id);

    res.json({
      transactions,
      pagination: {
        current_page: page,
        per_page: limit,
        total_items: total,
        total_pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single transaction by ID
const fetchTransactionById = async (req, res) => {
  try {
    const transaction = await findTransactionById(req.params.id, req.user.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing transaction
const modifyTransaction = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, category_id, amount, description } = req.body;
    const changes = await updateTransaction(req.params.id, req.user.id, {
      type,
      category_id,
      amount,
      description
    });

    if (changes === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ message: 'Transaction updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a transaction by ID
const removeTransactionById = async (req, res) => {
  try {
    const changes = await deleteTransaction(req.params.id, req.user.id);
    if (changes === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export all controller functions
module.exports = {
  createNewTransaction,
  fetchAllTransactions,
  fetchTransactionById,
  modifyTransaction,
  removeTransactionById
};
