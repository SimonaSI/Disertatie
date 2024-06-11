const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const User = require('../models/User');
const Category = require('../models/Category');
const { Sequelize, Op } = require('sequelize');

// GET all expenses
router.get('/expenses', async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET expense by ID
router.get('/expenses/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const expense = await Expense.findByPk(id);
        if (!expense) {
            res.status(404).json({ message: "Expense not found" });
            return;
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET all expenses by user ID
router.get('/users/:userId/expenses', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const expenses = await Expense.findAll({ where: { userId } });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// GET suma totală a cheltuielilor pe categorie pentru un utilizator într-o anumită lună
router.get('/expenses/user/:userId/sumByCategory', async (req, res) => {
    const userId = req.params.userId;
    const { month, year } = req.query; // Preia luna și anul din query params

    if (!month || !year) {
        return res.status(400).json({ error: "Month and year are required" });
    }

    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59); // Ultima zi a lunii

        const expensesByCategory = await Expense.findAll({
            where: {
                userId,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            attributes: [
                'categoryId',
                [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']
            ],
            include: [{
                model: Category,
                attributes: ['name']
            }],
            group: ['categoryId', 'Category.id'],
           // raw: true // Obținem rezultatele ca array simplu de obiecte
        });

        res.status(200).json(expensesByCategory);
    } catch (error) {
        console.error('Error fetching expenses by category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// GET evolutia cheltuielilor pe luni, opțional filtrate pe categorie
router.get('/expenses/user/:userId/evolution', async (req, res) => {
    const userId = req.params.userId;
    const { categoryId } = req.query; // Preia categoryId din query params

    try {
        const whereClause = {
            userId,
        };
        if (categoryId) {
            whereClause.categoryId = categoryId;
        }

        const expensesEvolution = await Expense.findAll({
            where: whereClause,
            attributes: [
                [Sequelize.literal("strftime('%Y-%m', date)"), 'month'],
                [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']
            ],
            group: [Sequelize.literal("strftime('%Y-%m', date)")],
            order: [[Sequelize.literal("strftime('%Y-%m', date)"), 'ASC']]
        });

        res.status(200).json(expensesEvolution);
    } catch (error) {
        res.status500.json({ error: error.message });
    }
});






// POST a new expense
router.post('/expenses', async (req, res) => {
    try {
        const expense = await Expense.create(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// POST a new expense for a user
router.post('/users/:userId/expenses', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const expense = await Expense.create({ ...req.body, userId });
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT (update) expense by ID
router.put('/expenses/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const expense = await Expense.findByPk(id);
        if (!expense) {
            res.status(404).json({ message: "Expense not found" });
            return;
        }
        await expense.update(req.body);
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE expense by ID
router.delete('/expenses/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const expense = await Expense.findByPk(id);
        if (!expense) {
            res.status(404).json({ message: "Expense not found" });
            return;
        }
        await expense.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
