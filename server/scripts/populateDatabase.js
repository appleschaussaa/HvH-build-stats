const mongoose = require('mongoose');
const Hero = require('../models/Hero');
const heroes = require('../db/heroData');
require('dotenv').config();

async function populateDatabase() {
  try {
    await Hero.deleteMany({});
    console.log('Cleared existing heroes');

    await Hero.insertMany(heroes);
    console.log('Inserted heroes');
  } catch (err) {
    console.error('Failed to populate database', err);
    throw err;
  }
}

module.exports = populateDatabase;