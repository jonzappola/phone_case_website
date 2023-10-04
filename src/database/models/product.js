//Simple product schema (since we only have phone cases)
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: String,
  image: String,
  style: String, // E.g., "Slim Fit," "Clear Case," etc.
  compatibleModels: [String], // E.g., ["iPhone 11", "iPhone 12", "iPhone 13 Pro Max"]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;