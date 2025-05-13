const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Expense = sequelize.define('Expense', {
  title: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  category: { type: DataTypes.STRING },
  date: { type: DataTypes.DATEONLY, allowNull: false },
});

User.hasMany(Expense);
Expense.belongsTo(User);

module.exports = Expense;
