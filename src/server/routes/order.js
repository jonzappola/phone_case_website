const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

// Create a new order
router.post('/create', authMiddleware, orderController.createOrder);

// Get a list of user's orders
router.get('/user', authMiddleware, orderController.getUserOrders);

// Get details of a specific order
router.get('/:orderId', authMiddleware, orderController.getOrderDetails);

module.exports = router;
