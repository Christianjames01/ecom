require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User');
const Chat = require('./models/Chat');

const products = [
    { name: 'Aurora Headphones', category: 'Electronics', price: 149.99, original: 199.99, rating: 4.8, reviews: 342, stock: 15, emoji: '🎧', badge: 'Sale', description: 'Premium noise-cancelling headphones with 30hr battery life.' },
    { name: 'Zenith Running Shoes', category: 'Fashion', price: 89.99, original: 89.99, rating: 4.6, reviews: 218, stock: 32, emoji: '👟', badge: 'New', description: 'Lightweight performance shoes for serious runners.' },
    { name: 'Obsidian Smart Watch', category: 'Electronics', price: 299.99, original: 349.99, rating: 4.9, reviews: 567, stock: 8, emoji: '⌚', badge: 'Hot', description: 'Health tracking, GPS, and 7-day battery.' },
    { name: 'Velvet Throw Blanket', category: 'Home', price: 45.00, original: 45.00, rating: 4.5, reviews: 89, stock: 50, emoji: '🛋️', badge: null, description: 'Ultra-soft 100% microfiber blanket in 12 colors.' },
    { name: 'Titanium Coffee Grinder', category: 'Kitchen', price: 72.00, original: 95.00, rating: 4.7, reviews: 134, stock: 20, emoji: '☕', badge: 'Sale', description: 'Burr grinder with 40 grind settings.' },
    { name: 'Polar Camera Backpack', category: 'Outdoors', price: 119.00, original: 119.00, rating: 4.4, reviews: 76, stock: 12, emoji: '🎒', badge: null, description: 'Waterproof 30L bag with padded camera compartments.' },
    { name: 'Neo Desk Lamp', category: 'Home', price: 58.00, original: 78.00, rating: 4.6, reviews: 201, stock: 25, emoji: '💡', badge: 'Sale', description: 'LED lamp with 5 color temps and wireless charging base.' },
    { name: 'Prism Sunglasses', category: 'Fashion', price: 34.99, original: 34.99, rating: 4.3, reviews: 445, stock: 60, emoji: '🕶️', badge: 'New', description: 'UV400 polarized lenses in a classic aviator frame.' },
];

const orders = [
    { orderId: 'ORD-001', customer: 'Jane Smith', items: 3, total: 389.98, status: 'Delivered', date: '2025-01-15' },
    { orderId: 'ORD-002', customer: 'Mark Johnson', items: 1, total: 89.99, status: 'Shipped', date: '2025-01-18' },
    { orderId: 'ORD-003', customer: 'Lisa Chen', items: 2, total: 194.99, status: 'Processing', date: '2025-01-20' },
    { orderId: 'ORD-004', customer: 'Alex Rivera', items: 4, total: 527.97, status: 'Pending', date: '2025-01-21' },
];

const users = [
    { name: 'Jane Smith', email: 'jane@email.com', password: 'password123', orders: 8, spent: 1240.50, status: 'Active', joined: '2024-06-01' },
    { name: 'Mark Johnson', email: 'mark@email.com', password: 'password123', orders: 3, spent: 389.97, status: 'Active', joined: '2024-09-15' },
    { name: 'Lisa Chen', email: 'lisa@email.com', password: 'password123', orders: 12, spent: 2180.00, status: 'Active', joined: '2024-03-22' },
    { name: 'Alex Rivera', email: 'alex@email.com', password: 'password123', orders: 1, spent: 527.97, status: 'Blocked', joined: '2025-01-05' },
    { name: 'Admin User', email: 'admin@nexus.com', password: 'admin123', role: 'admin', status: 'Active', joined: '2024-01-01' },
];

const chats = [
    {
        user: 'Jane Smith', avatar: 'JS', unread: 2, time: '2m ago', lastMsg: 'Is my order shipped yet?',
        messages: [
            { from: 'user', text: 'Hi! Need help with ORD-001', time: '10:30' },
            { from: 'admin', text: 'Hello Jane! How can I help?', time: '10:31' },
            { from: 'user', text: 'Is my order shipped yet?', time: '10:33' },
        ],
    },
    {
        user: 'Mark Johnson', avatar: 'MJ', unread: 0, time: '1h ago', lastMsg: 'Thanks!',
        messages: [
            { from: 'user', text: 'Can I return the shoes?', time: '09:00' },
            { from: 'admin', text: 'Yes! 30 days from delivery.', time: '09:02' },
            { from: 'user', text: 'Thanks!', time: '09:03' },
        ],
    },
    {
        user: 'Alex Rivera', avatar: 'AR', unread: 1, time: '3h ago', lastMsg: 'When will it restock?',
        messages: [
            { from: 'user', text: 'When will the Obsidian Watch restock?', time: '07:00' },
        ],
    },
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
        Product.deleteMany({}),
        Order.deleteMany({}),
        User.deleteMany({}),
        Chat.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // Insert fresh data
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products`);

    await Order.insertMany(orders);
    console.log(`✅ Seeded ${orders.length} orders`);

    // Users need to go through model (for password hashing)
    for (const u of users) {
        await User.create(u);
    }
    console.log(`✅ Seeded ${users.length} users`);

    await Chat.insertMany(chats);
    console.log(`✅ Seeded ${chats.length} chats`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('Admin login: admin@nexus.com / admin123');
    console.log('Customer login: jane@email.com / password123');
    mongoose.disconnect();
}

seed().catch(err => {
    console.error('❌ Seed error:', err);
    mongoose.disconnect();
});