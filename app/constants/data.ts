import { Product, Order, User, Chat } from '../types';

export const PRODUCTS: Product[] = [
    { id: 1, name: 'Aurora Headphones', category: 'Electronics', price: 149.99, original: 199.99, rating: 4.8, reviews: 342, stock: 15, emoji: '🎧', badge: 'Sale', description: 'Premium noise-cancelling headphones with 30hr battery life.' },
    { id: 2, name: 'Zenith Running Shoes', category: 'Fashion', price: 89.99, original: 89.99, rating: 4.6, reviews: 218, stock: 32, emoji: '👟', badge: 'New', description: 'Lightweight performance shoes for serious runners.' },
    { id: 3, name: 'Obsidian Smart Watch', category: 'Electronics', price: 299.99, original: 349.99, rating: 4.9, reviews: 567, stock: 8, emoji: '⌚', badge: 'Hot', description: 'Health tracking, GPS, and 7-day battery.' },
    { id: 4, name: 'Velvet Throw Blanket', category: 'Home', price: 45.00, original: 45.00, rating: 4.5, reviews: 89, stock: 50, emoji: '🛋️', badge: null, description: 'Ultra-soft 100% microfiber blanket in 12 colors.' },
    { id: 5, name: 'Titanium Coffee Grinder', category: 'Kitchen', price: 72.00, original: 95.00, rating: 4.7, reviews: 134, stock: 20, emoji: '☕', badge: 'Sale', description: 'Burr grinder with 40 grind settings.' },
    { id: 6, name: 'Polar Camera Backpack', category: 'Outdoors', price: 119.00, original: 119.00, rating: 4.4, reviews: 76, stock: 12, emoji: '🎒', badge: null, description: 'Waterproof 30L bag with padded camera compartments.' },
    { id: 7, name: 'Neo Desk Lamp', category: 'Home', price: 58.00, original: 78.00, rating: 4.6, reviews: 201, stock: 25, emoji: '💡', badge: 'Sale', description: 'LED lamp with 5 color temps and wireless charging base.' },
    { id: 8, name: 'Prism Sunglasses', category: 'Fashion', price: 34.99, original: 34.99, rating: 4.3, reviews: 445, stock: 60, emoji: '🕶️', badge: 'New', description: 'UV400 polarized lenses in a classic aviator frame.' },
];

export const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home', 'Kitchen', 'Outdoors'];

export const ORDERS_DATA: Order[] = [
    { id: 'ORD-001', customer: 'Jane Smith', items: 3, total: 389.98, status: 'Delivered', date: '2025-01-15' },
    { id: 'ORD-002', customer: 'Mark Johnson', items: 1, total: 89.99, status: 'Shipped', date: '2025-01-18' },
    { id: 'ORD-003', customer: 'Lisa Chen', items: 2, total: 194.99, status: 'Processing', date: '2025-01-20' },
    { id: 'ORD-004', customer: 'Alex Rivera', items: 4, total: 527.97, status: 'Pending', date: '2025-01-21' },
];

export const USERS_DATA: User[] = [
    { id: 1, name: 'Jane Smith', email: 'jane@email.com', orders: 8, spent: 1240.50, status: 'Active', joined: '2024-06-01' },
    { id: 2, name: 'Mark Johnson', email: 'mark@email.com', orders: 3, spent: 389.97, status: 'Active', joined: '2024-09-15' },
    { id: 3, name: 'Lisa Chen', email: 'lisa@email.com', orders: 12, spent: 2180.00, status: 'Active', joined: '2024-03-22' },
    { id: 4, name: 'Alex Rivera', email: 'alex@email.com', orders: 1, spent: 527.97, status: 'Blocked', joined: '2025-01-05' },
];

export const INIT_CHATS: Chat[] = [
    {
        id: 1, user: 'Jane Smith', avatar: 'JS', unread: 2, time: '2m ago', lastMsg: 'Is my order shipped yet?',
        messages: [
            { from: 'user', text: 'Hi! Need help with ORD-001', time: '10:30' },
            { from: 'admin', text: 'Hello Jane! How can I help?', time: '10:31' },
            { from: 'user', text: 'Is my order shipped yet?', time: '10:33' },
        ],
    },
    {
        id: 2, user: 'Mark Johnson', avatar: 'MJ', unread: 0, time: '1h ago', lastMsg: 'Thanks!',
        messages: [
            { from: 'user', text: 'Can I return the shoes?', time: '09:00' },
            { from: 'admin', text: 'Yes! 30 days from delivery.', time: '09:02' },
            { from: 'user', text: 'Thanks!', time: '09:03' },
        ],
    },
    {
        id: 3, user: 'Alex Rivera', avatar: 'AR', unread: 1, time: '3h ago', lastMsg: 'When will it restock?',
        messages: [
            { from: 'user', text: 'When will the Obsidian Watch restock?', time: '07:00' },
        ],
    },
];