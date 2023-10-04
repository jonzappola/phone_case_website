const express = require('express');
const app = express();

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
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(userRoutes);
app.use(authRoutes);
module.exports = app;

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});