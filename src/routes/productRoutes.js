const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const Product = require('../models/product'); // Your product model
//list all
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find(); // Use Mongoose to query your database

    res.json(products); // Send the products array as the response
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Create a new product
router.post('/create/', productController.createProduct);

// Define the GET route for getting a product by SKU
router.get('/:sku/', productController.getProductBySKU);

// Define the GET route for getting a product by name
router.get('/name/:name', productController.getProductByName);

// Get details of a specific product
router.get('/:productId/', productController.getProduct);

// Update product details
router.put('/:productId/', productController.updateProduct);

// Delete a product
router.delete('/:productId/', productController.deleteProduct);

module.exports = router;