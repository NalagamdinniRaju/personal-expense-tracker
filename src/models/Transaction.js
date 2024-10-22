
const db = require('../config/database');

// Create a new transaction
const createTransaction = (data) => {
  const { user_id, type, category_id, amount, description } = data;
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO transactions (user_id, type, category_id, amount, description) VALUES (?, ?, ?, ?, ?)',
      [user_id, type, category_id, amount, description],
      function (err) {
        if (err) reject(err);
        resolve(this.lastID);
      }
    );
  });
};

// Find transactions by user ID with pagination
const findTransactionsByUserId = (userId, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT t.*, c.name as category_name 
       FROM transactions t 
       JOIN categories c ON t.category_id = c.id 
       WHERE t.user_id = ? 
       ORDER BY t.date DESC
       LIMIT ? OFFSET ?`,
      [userId, limit, offset],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows || []);
      }
    );
  });
};

// Count transactions by user ID
const countTransactionsByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT COUNT(*) as count FROM transactions WHERE user_id = ?',
      [userId],
      (err, row) => {
        if (err) reject(err);
        resolve(row ? row.count : 0);
      }
    );
  });
};

// Find a transaction by ID and user ID
const findTransactionById = (id, userId) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT t.*, c.name as category_name 
       FROM transactions t 
       JOIN categories c ON t.category_id = c.id 
       WHERE t.id = ? AND t.user_id = ?`,
      [id, userId],
      (err, row) => {
        if (err) reject(err);
        resolve(row);
      }
    );
  });
};

// Update a transaction by ID and user ID
const updateTransaction = (id, userId, data) => {
  const { type, category_id, amount, description } = data;
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE transactions 
       SET type = ?, category_id = ?, amount = ?, description = ? 
       WHERE id = ? AND user_id = ?`,
      [type, category_id, amount, description, id, userId],
      function (err) {
        if (err) reject(err);
        resolve(this.changes);
      }
    );
  });
};

// Delete a transaction by ID and user ID
const deleteTransaction = (id, userId) => {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM transactions WHERE id = ? AND user_id = ?',
      [id, userId],
      function (err) {
        if (err) reject(err);
        resolve(this.changes);
      }
    );
  });
};

module.exports = {
  createTransaction,
  findTransactionsByUserId,
  countTransactionsByUserId,
  findTransactionById,
  updateTransaction,
  deleteTransaction
};
