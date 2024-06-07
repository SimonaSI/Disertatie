const express = require('express');
const router = express.Router();
const Income = require('../models/Income'); 
const Category = require('../models/Category');
const { Sequelize, Op } = require('sequelize');

// GET all incomes
router.get('/incomes', async (req, res) => {
    try {
        const incomes = await Income.findAll();
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET incomes by user ID
router.get('/incomes/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const incomes = await Income.findAll({ where: { userId } });
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




// GET suma totală a veniturilor pe categorie pentru un utilizator într-o anumită lună
router.get('/incomes/user/:userId/sumByCategory', async (req, res) => {
    const userId = req.params.userId;
    const { month, year } = req.query; // Preia luna și anul din query params

    if (!month || !year) {
        return res.status(400).json({ error: "Month and year are required" });
    }

    try {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59); // Ultima zi a lunii

        const incomesByCategory = await Income.findAll({
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
            group: ['categoryId', 'Category.id']
        });
        res.status(200).json(incomesByCategory);
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

// POST a new income for a user
router.post('/incomes/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const newIncome = await Income.create({ ...req.body, userId });
        res.status(201).json(newIncome);
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
