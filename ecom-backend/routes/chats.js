const router = require('express').Router();
const Chat = require('../models/Chat');
router.get('/', async (req, res) => {
    try { res.json(await Chat.find().sort({ updatedAt: -1 })); }
    catch (err) { res.status(500).json({ error: err.message }); }
});
router.get('/:id', async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) return res.status(404).json({ error: 'Not found' });
        res.json(chat);
    } catch (err) { res.status(500).json({ error: err.message }); }
});
router.post('/:id/message', async (req, res) => {
    try {
        const { from, text } = req.body;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const update = { $push: { messages: { from, text, time } }, lastMsg: text, time: 'just now', unread: from === 'user' ? 1 : 0 };
        res.json(await Chat.findByIdAndUpdate(req.params.id, update, { new: true }));
    } catch (err) { res.status(400).json({ error: err.message }); }
});
router.put('/:id/read', async (req, res) => {
    try { res.json(await Chat.findByIdAndUpdate(req.params.id, { unread: 0 }, { new: true })); }
    catch (err) { res.status(400).json({ error: err.message }); }
});
router.post('/', async (req, res) => {
    try { res.status(201).json(await Chat.create(req.body)); }
    catch (err) { res.status(400).json({ error: err.message }); }
});
module.exports = router;
