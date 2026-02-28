const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:     { type: String, enum: ['customer', 'admin'], default: 'customer' },
    orders:   { type: Number, default: 0 },
    spent:    { type: Number, default: 0 },
    status:   { type: String, enum: ['Active', 'Blocked'], default: 'Active' },
    joined:   { type: String, default: () => new Date().toISOString().split('T')[0] },
}, { timestamps: true });
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});
UserSchema.methods.comparePassword = function (plain) {
    return bcrypt.compare(plain, this.password);
};
module.exports = mongoose.model('User', UserSchema);
