const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

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

// POST a new expense
router.post('/expenses', async (req, res) => {
    try {
        const expense = await Expense.create(req.body);
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
