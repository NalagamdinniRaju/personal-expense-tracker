const db = require('../config/database');
const bcrypt = require('bcryptjs');

// Create a new user
const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword],
      function (err) {
        if (err) reject(err);
        resolve(this.lastID); // Resolve with the new user's ID
      }
    );
  });
};

// Find user by email
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) reject(err);
      resolve(row); // Resolve with the user object or null if not found
    });
  });
};

// Find user by ID
const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      resolve(row); // Resolve with the user object or null if not found
    });
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};
