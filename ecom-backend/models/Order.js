const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    orderId:   { type: String, required: true, unique: true },
    customer:  { type: String, required: true },
    items:     { type: Number, required: true },
    total:     { type: Number, required: true },
    status:    { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    date:      { type: String, required: true },
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    products:  [{ productId: mongoose.Schema.Types.ObjectId, name: String, qty: Number, price: Number }],
}, { timestamps: true });
module.exports = mongoose.model('Order', OrderSchema);
