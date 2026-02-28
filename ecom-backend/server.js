const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/users', require('./routes/users'));
app.use('/api/chats', require('./routes/chats'));
app.use('/api/auth', require('./routes/auth'));

// Health check
app.get('/', (req, res) => res.json({ status: 'NexusStore API running ✅' }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected');
        app.listen(process.env.PORT || 3000, () =>
            console.log(`🚀 Server running on port ${process.env.PORT || 3000}`)
        );
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));