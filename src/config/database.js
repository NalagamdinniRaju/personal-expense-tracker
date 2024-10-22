
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(
  process.env.DB_PATH || path.join(__dirname, '../database.sqlite'),
  (err) => {
    if (err) {
      console.error('Database connection error:', err);
    } else {
      console.log('Connected to SQLite database');
      initDatabase();
    }
  }
);

function initDatabase() {
  db.serialize(() => {
    // Drop existing tables
    // db.run('DROP TABLE IF EXISTS transactions');
    // db.run('DROP TABLE IF EXISTS categories');
    // db.run('DROP TABLE IF EXISTS users');

    // Create Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Categories table
    db.run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT CHECK(type IN ('income', 'expense')) NOT NULL
      )
    `);

    // Create Transactions table
    db.run(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
        category_id INTEGER NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        description TEXT,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )
    `);

    // // Insert default categories
    // const defaultCategories = [
    //   ['Salary', 'income'],
    //   ['Freelance', 'income'],
    //   ['Investments', 'income'],
    //   ['Food', 'expense'],
    //   ['Transportation', 'expense'],
    //   ['Utilities', 'expense'],
    //   ['Entertainment', 'expense'],
    //   ['Shopping', 'expense']
    // ];

    // const insertCategory = db.prepare('INSERT INTO categories (name, type) VALUES (?, ?)');
    // defaultCategories.forEach(category => {
    //   insertCategory.run(category);
    // });
    // insertCategory.finalize();

    // console.log('Database initialized with dummy data');
  });
}

module.exports = db;
