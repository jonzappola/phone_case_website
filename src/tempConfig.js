require('dotenv').config({ path: (__dirname, '../.env') });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

// Middleware setup
app.use(cors({
  origin: 'http://127.0.0.1:5000',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes here
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

// Mount routes
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);
app.use('/product', productRoutes);
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  console.log(JWT_SECRET);
  console.log(JWT_EXPIRATION);
  // Start your Express server here
  const server = app; // Rename the variable here
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error: ', err);
});
