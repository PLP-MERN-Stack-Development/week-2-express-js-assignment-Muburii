const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, required: true },
});

module.exports = mongoose.model('Product', productSchema);