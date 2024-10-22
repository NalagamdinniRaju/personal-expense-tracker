
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getSummary, getMonthlyReport, getCategoryReport } = require('../controllers/reportController');

router.use(auth);

router.get('/summary', getSummary); //  Get summary of all expenses
router.get('/monthly', getMonthlyReport); //  Get monthly report of all expenses
router.get('/category', getCategoryReport); //   Get category report of all expenses


module.exports = router;
