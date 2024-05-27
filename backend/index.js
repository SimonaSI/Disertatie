console.log("Hello, lume!")

const express = require("express");
const { DataTypes } = require("sequelize");
const cors = require("cors");
const app = express();

const PORT = 8080;
app.use(cors());

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTEs
const categoryRoutes = require("./routes/ruteCategory");
app.use("/api", categoryRoutes);

const userRoutes = require("./routes/ruteUser");
app.use("/api", userRoutes);

const debtRoutes = require("./routes/ruteDebt");
app.use("/api", debtRoutes);

const incomeRoutes = require("./routes/ruteIncome");
app.use("/api", incomeRoutes);

const expenseRoutes = require("./routes/ruteExpense");
app.use("/api", expenseRoutes);


// relatii

const sequelize = require("./sequelize");
const Category = require("./models/Category");
const User = require("./models/User");
const Income = require("./models/Income");
const Expense = require("./models/Expense");
const Debt = require("./models/Debt");

// app.use("/api", loginRoutes);


// start server
app.listen(PORT, (req, res) => {
  console.log(`Serverul asculta pe portul ${PORT}`);
});


User.hasMany(Category, { foreignKey: 'userId' });
Category.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Income, { foreignKey: 'userId' });
Income.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Debt, { foreignKey: 'userId' });
Debt.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Income, { foreignKey: 'categoryId' });
Income.belongsTo(Category, { foreignKey: 'categoryId' });

Category.hasMany(Expense, { foreignKey: 'categoryId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });



app.get('/create', async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Database created." });
  } catch (err) {
    console.log(err.message)
    next(err);
  }
});
