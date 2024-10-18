const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true },
    health: { type: Number, required: true },
    attack: { type: Number, required: true },
    defense: { type: Number, required: true },
    image: { type: String },
    comments: { type: [String] },
});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;