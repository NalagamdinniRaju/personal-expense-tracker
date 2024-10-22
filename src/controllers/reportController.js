
const db = require('../config/database');

// Get summary function
const getSummary = async (req, res) => {
  try {
    const user_id = req.user.id;
    
    const sql = `
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as total_expenses
      FROM transactions 
      WHERE user_id = ?
    `;

    db.get(sql, [user_id], (err, row) => {
      if (err) throw err;
      
      const balance = (row.total_income || 0) - (row.total_expenses || 0);
      res.json({
        total_income: row.total_income || 0,
        total_expenses: row.total_expenses || 0,
        balance
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get monthly report function
const getMonthlyReport = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { year, month } = req.query;

    const sql = `
      SELECT 
        strftime('%Y-%m', date) as month,
        type,
        SUM(amount) as total
      FROM transactions
      WHERE user_id = ?
      ${year ? "AND strftime('%Y', date) = ?" : ''}
      ${month ? "AND strftime('%m', date) = ?" : ''}
      GROUP BY strftime('%Y-%m', date), type
      ORDER BY month DESC
    `;

    const params = [user_id];
    if (year) params.push(year);
    if (month) params.push(month);

    db.all(sql, params, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get category report function
const getCategoryReport = async (req, res) => {
  try {
    const user_id = req.user.id;
    
    const sql = `
      SELECT 
        c.name as category,
        t.type,
        SUM(t.amount) as total
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      WHERE t.user_id = ?
      GROUP BY c.name, t.type
      ORDER BY t.type, total DESC
    `;

    db.all(sql, [user_id], (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export the functions
module.exports = {
  getSummary,
  getMonthlyReport,
  getCategoryReport
};
