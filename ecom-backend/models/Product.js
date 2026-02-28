const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name:        { type: String, required: true },
    category:    { type: String, required: true },
    price:       { type: Number, required: true },
    original:    { type: Number, required: true },
    rating:      { type: Number, default: 0 },
    reviews:     { type: Number, default: 0 },
    stock:       { type: Number, default: 0 },
    emoji:       { type: String, default: '??' },
    badge:       { type: String, default: null },
    description: { type: String, default: '' },
}, { timestamps: true });
module.exports = mongoose.model('Product', ProductSchema);
