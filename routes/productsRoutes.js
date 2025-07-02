const express = require('express');
const router = express.Router();
const Product = require('../models/Products');
const validateProduct = require('../middleware/validateProduct');
const { NotFoundError } = require('../middleware/errors'); // Import custom error

// Create a Product
router.post('/', validateProduct, async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// Get all Products
router.get('/', async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// Get a Product By Id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new NotFoundError('Product not found');
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.get('/stats', async (req, res, next) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

// Update a Product by ID
router.put('/:id', validateProduct, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, runValidators: true 
    });
    if (!product) throw new NotFoundError('Product not found');
    res.send(product);
  } catch (err) {
    next(err);
  }
});

// Delete a Product by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw new NotFoundError('Product not found');
    res.send(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;