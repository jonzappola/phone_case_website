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
  image: String,
  compatibleModels: {
    type: String,
    required: true,
  },
  sku:{
    type: String,
    required: true,
  } // E.g., ["iPhone 11", "iPhone 12", "iPhone 13 Pro Max"]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;