const Product = require('../models/product');

// List all products
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, image, compatibleModels, sku } = req.body;
    
    // Validate input data (you can add more validation as needed)
    if (!name || !price || !compatibleModels || !sku) {
      return res.status(400).json({ error: 'Name, price, compatibleModels, and sku are required' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      compatibleModels,
      sku,
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Get details of a specific product
exports.getProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update product details
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, price } = req.body;

    // Validate input data (you can add more validation as needed)
    if (!name || !description || !price || !sku) {
      return res.status(400).json({ error: 'Name, description, price, and sku are required' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};