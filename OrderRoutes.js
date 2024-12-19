const express = require('express');
const router = express.Router();
const Order = require('./orders');

router.get('/orders', async (req, res) => {
    try {
        const orders = await orders.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/orders/:id', async (req, res) => {
    try {
        const order = await order.findById(req.params.id);
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/orders', async (req, res) => {
    const order = new Order({
        product: req.body.product,
        quantity: req.body.quantity,
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;