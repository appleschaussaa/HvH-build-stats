const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const heroSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true,
        min: 1
    },
    health: {
        type: Number,
        required: true
    },
    attack: {
        type: Number,
        required: true
    },
    defense: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: 'default-image-url' // Provide a default image URL
    },
    comments: [{
        type: String
    }]
}, {
    timestamps: true
});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;