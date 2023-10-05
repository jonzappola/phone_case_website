const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config('../environment_variables.env');

// Middleware setup
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse form data

// Define routes here
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');


// Mount routes
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/product',productRoutes);
app.use('/auth',authRoutes);
module.exports = app;

mongoose.connect('mongodb://127.0.0.1:27017/phonecase?directConnection=true', {
    useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    // Start your Express server here
    const app = require('./tempConfig');
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('MongoDB connection error: ', err);
});
