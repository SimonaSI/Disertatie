const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET user by ID
router.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a new user
router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// POST pentru autentificare (login)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Caută utilizatorul după adresa de email și parolă
        const user = await User.findOne({ where: { email, password } });
        
        // Verifică dacă utilizatorul există și parola este corectă
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Autentificare reușită
        res.status(200).json({ message: "Login successful", userId: user.id});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT (update) user by ID
router.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await user.update(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE user by ID
router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await user.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
