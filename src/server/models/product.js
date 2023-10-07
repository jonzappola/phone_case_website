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
  images: [{
    type: String,
  }],
  compatibleModels: [{
    type: String,
    required: true,
  }],
  sku:[{
    type: String,
    required: true,
    unique: true,
  }],
  quantity:[{
    type: Number,
    required:true, 
}],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;