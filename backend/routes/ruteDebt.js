const express = require('express');
const router = express.Router();
const Debt = require('../models/Debt');

// GET all debts
router.get('/debts', async (req, res) => {
    try {
        const debts = await Debt.findAll();
        res.status(200).json(debts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET debt by ID
router.get('/debts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const debt = await Debt.findByPk(id);
        if (!debt) {
            res.status(404).json({ message: "Debt not found" });
            return;
        }
        res.status(200).json(debt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET debts by isPaid
router.get('/debts/paid/:isPaid', async (req, res) => {
    const isPaid = req.params.isPaid === 'true'; // Convertește stringul din parametru într-un boolean
    try {
        const debts = await Debt.findAll({ where: { isPaid } });
        res.status(200).json(debts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// POST a new debt
router.post('/debts', async (req, res) => {
    try {
        const debt = await Debt.create(req.body);
        res.status(201).json(debt);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT (update) debt by ID
router.put('/debts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const debt = await Debt.findByPk(id);
        if (!debt) {
            res.status(404).json({ message: "Debt not found" });
            return;
        }
        await debt.update(req.body);
        res.status(200).json(debt);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE debt by ID
router.delete('/debts/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const debt = await Debt.findByPk(id);
        if (!debt) {
            res.status(404).json({ message: "Debt not found" });
            return;
        }
        await debt.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
