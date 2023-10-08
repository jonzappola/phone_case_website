const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// List all products
router.get('/', productController.listProducts);

// Create a new product
router.post('/create/', productController.createProduct);

// Define the GET route for getting a product by SKU
router.get('/:sku/', productController.getProductBySKU);

// Get details of a specific product
router.get('/:productId/', productController.getProduct);

// Update product details
router.put('/:productId/', productController.updateProduct);

// Delete a product
router.delete('/:productId/', productController.deleteProduct);

module.exports = router;