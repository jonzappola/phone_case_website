const Order = require('../models/order'); // Assuming you have an Order model
const Cart = require('../models/cart'); // Assuming you have a Cart model

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user authentication
    const { cartId, totalPrice } = req.body;

    // Validate input data (you can add more validation as needed)
    if (!cartId || !totalPrice) {
      return res.status(400).json({ error: 'Cart ID and total price are required' });
    }

    // Find the user's cart
    const cart = await Cart.findById(cartId);

    if (!cart || cart.userId.toString() !== userId) {
      return res.status(404).json({ error: 'Cart not found or does not belong to the user' });
    }

    // Create a new order based on the cart
    const newOrder = new Order({
      userId,
      items: cart.items,
      totalPrice,
    });

    const savedOrder = await newOrder.save();

    // Clear the user's cart after creating an order
    cart.items = [];
    await cart.save();

    res.json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a list of user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user authentication

    // Find all orders belonging to the user
    const orders = await Order.find({ userId });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get details of a specific order
exports.getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user._id; // Assuming you have user authentication

    // Find the order by ID and ensure it belongs to the user
    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
