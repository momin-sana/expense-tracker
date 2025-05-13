const Expense = require('../models/Expense');

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.findAll({ where: { UserId: req.userId } });
  res.json(expenses);
};

exports.addExpense = async (req, res) => {
  const { title, amount, category, date } = req.body;
  try {
    const expense = await Expense.create({ title, amount, category, date, UserId: req.userId });
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await Expense.update(req.body, { where: { id, UserId: req.userId } });
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await Expense.destroy({ where: { id, UserId: req.userId } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
