const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
    heroId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hero', required: true },
    buildName: { type: String, required: true },
    level: { type: Number, required: true },
    health: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
});

const Build = mongoose.model('Build', buildSchema);

module.exports = Build;