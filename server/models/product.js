const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    images: { type: [String], required: true },
    colors: { type: [String], required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewCount: { type: Number, required: true },
    features: { type: [String], required: true }
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;