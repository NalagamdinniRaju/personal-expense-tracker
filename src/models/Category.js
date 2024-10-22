const db = require('../config/database');

// Get all categories
const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM categories ORDER BY type, name', (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

module.exports = {
  getAllCategories
};
