const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const orderRoutes = require('./OrderRoutes');
const productRoutes = require('./ProductRoutes');

app.use('/api', orderRoutes);
app.use('/api', productRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});