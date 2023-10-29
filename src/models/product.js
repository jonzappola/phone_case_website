const mongoose = require('mongoose');

// Define the schema and use the "products" collection in the "phonecase" database
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
  images: [{
    type: String,
  }],
  compatibleModels: [{
    type: String,
    required: true,
  }],
  sku: [{
    type: String,
    required: true,
    unique: true,
  }],
  quantity: [{
    type: Number,
    required: true,
  }],
}, { collection: 'products' }); // Specify the collection name

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
