const Cart = require('../models/cart'); // Assuming you have a Cart model

// Add a product to the user's cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Assuming you have user authentication

    // Validate input data (you can add more validation as needed)
    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId });

    // If the user doesn't have a cart, create a new one
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Find the product in the cart's items array (if it exists)
    const existingProduct = cart.items.find(item => item.productId === productId);

    // If the product exists in the cart, update its quantity; otherwise, add it to the cart
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    // Save the cart
    const savedCart = await cart.save();
    
    res.json(savedCart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove a product from the user's cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id; // Assuming you have user authentication

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Find the index of the product in the cart's items array
    const productIndex = cart.items.findIndex(item => item.productId === productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    // Remove the product from the cart's items array
    cart.items.splice(productIndex, 1);

    // Save the updated cart
    const savedCart = await cart.save();

    res.json(savedCart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get the user's cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user authentication

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
