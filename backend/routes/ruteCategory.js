const express = require('express');
const sequelize = require("../sequelize");
const router = require("express").Router();
const Category = require('../models/Category');


// GET all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET all categories by type (income or expense)
router.get('/categories/:type', async (req, res) => {
    const type = req.params.type.toLowerCase();
    try {
        const categories = await Category.findAll({ where: { type } });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET income categories by user ID
router.get('/categories/income/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log(userId)
    try {
        const incomeCategories = await Category.findAll({ where: { type: 'venit', userId } });
        res.status(200).json(incomeCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET expense categories by user ID
router.get('/categories/expense/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const expenseCategories = await Category.findAll({ where: { type: 'cheltuiala', userId } });
        res.status(200).json(expenseCategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET category by ID
router.get('/categorie/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a new category
router.post('/categories', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT (update) category by ID
router.put('/categories/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        await category.update(req.body);
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE category by ID
router.delete('/categories/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        await category.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
