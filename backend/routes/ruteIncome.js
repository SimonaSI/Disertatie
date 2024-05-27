const express = require('express');
const router = express.Router();
const Income = require('../models/Income'); // Importăm modelul Income

// GET all incomes
router.get('/incomes', async (req, res) => {
    try {
        const incomes = await Income.findAll();
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET income by ID
router.get('/incomes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const income = await Income.findByPk(id);
        if (!income) {
            res.status(404).json({ message: "Income not found" });
            return;
        }
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a new income
router.post('/incomes', async (req, res) => {
    try {
        const income = await Income.create(req.body);
        res.status(201).json(income);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT (update) income by ID
router.put('/incomes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const income = await Income.findByPk(id);
        if (!income) {
            res.status(404).json({ message: "Income not found" });
            return;
        }
        await income.update(req.body);
        res.status(200).json(income);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE income by ID
router.delete('/incomes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const income = await Income.findByPk(id);
        if (!income) {
            res.status(404).json({ message: "Income not found" });
            return;
        }
        await income.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
