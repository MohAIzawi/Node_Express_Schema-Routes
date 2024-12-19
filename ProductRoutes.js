const express = require('express');
const router = express.Router();
const Product = require('./products');

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/products', validateProduct, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.put('/products/:id', validateProduct, async (req, res) => {
    try {
        const updatedProduct = await Product.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    quantity: req.body.quantity,
                },
            }
        );
        res.json(updatedProduct);
    } catch (err) {
        res.json({ message: err.message });
    }
});

router.delete('/products/:id', async (req, res) => {
    try {
        const removedProduct = await Product.deleteOne({ _id: req.params.id });
        res.json(removedProduct);
    } catch (err) {
        res.json({ message: err.message });
    }

});

function validateProduct(req, res, next) {
    if (!req.body.name || typeof req.body.price !== 'number' || req.body.price < 0 || !Number.isInteger(req.body.quantity) || req.body.quantity < 0) {
        return res.status(400).json({ message: 'Invalid product data' });
    }
    next();
}

module.exports = router;
