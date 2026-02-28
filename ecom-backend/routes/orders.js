const router = require('express').Router();
const Order = require('../models/Order');

// GET all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single order
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.id });
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create order
router.post('/', async (req, res) => {
    try {
        const count = await Order.countDocuments();
        const orderId = `ORD-${String(count + 1).padStart(3, '0')}`;
        const order = await Order.create({ ...req.body, orderId });
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT update order status
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate(
            { orderId: req.params.id },
            req.body,
            { new: true }
        );
        res.json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;