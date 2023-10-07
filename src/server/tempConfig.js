const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({path:(__dirname, '../../.env')});
const JWT_SECRET= process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

// Middleware setup
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse form data

// Define routes here
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const authRoutes = require('./routes/auth');
//const userRoutes = require('./routes/user');


// Mount routes
//app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/product',productRoutes);
app.use('/auth',authRoutes);
module.exports = app;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    console.log(JWT_SECRET);
    console.log(JWT_EXPIRATION);
    // Start your Express server here
    const app = require('./tempConfig');
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('MongoDB connection error: ', err);
});
