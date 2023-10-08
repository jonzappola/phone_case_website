const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

// Add a product to the user's cart
router.post('/auth/add/', authMiddleware, cartController.addToCart);

// Remove a product from the user's cart
router.delete('/auth/remove/:productId/', authMiddleware, cartController.removeFromCart);

// Get the user's cart
router.get('/auth/get/', authMiddleware, cartController.getCart);

module.exports = router;
