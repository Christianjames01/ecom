const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
    from: { type: String, enum: ['user', 'admin'], required: true },
    text: { type: String, required: true },
    time: { type: String, default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
});
const ChatSchema = new mongoose.Schema({
    user:     { type: String, required: true },
    avatar:   { type: String, required: true },
    unread:   { type: Number, default: 0 },
    time:     { type: String, default: 'just now' },
    lastMsg:  { type: String, default: '' },
    messages: [MessageSchema],
}, { timestamps: true });
module.exports = mongoose.model('Chat', ChatSchema);
