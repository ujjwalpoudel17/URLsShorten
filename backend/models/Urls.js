

const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    alias: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    clickHistory: [{ timestamp: { type: Date, default: Date.now } }],
});

module.exports = mongoose.model("Url", urlSchema);