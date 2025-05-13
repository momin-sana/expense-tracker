const express = require('express');
const { getExpenses, addExpense, updateExpense, deleteExpense } = require('../controllers/expenseController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(auth);
router.get('/', getExpenses);
router.post('/', addExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;