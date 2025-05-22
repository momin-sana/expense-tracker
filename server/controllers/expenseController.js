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
  try {
    const expense = await Expense.findOne({
      where: {
        id: req.params.id,
        UserId: req.userId, // Make sure it's the user's own expense
      },
    });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await expense.update(req.body);
    res.json(expense); // Instead of just a message, return the updated expense
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Expense.destroy({ where: { id, UserId: req.userId } });
    if (deleted) {
      res.json({ message: 'Deleted' });
    } else {
      res.status(404).json({ error: 'Expense not found or unauthorized' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

