const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

// Add a product to the user's cart
router.post('/add', authMiddleware, cartController.addToCart);

// Remove a product from the user's cart
router.delete('/remove/:productId', authMiddleware, cartController.removeFromCart);

// Get the user's cart
router.get('/get', authMiddleware, cartController.getCart);

module.exports = router;
