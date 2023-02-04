const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  wind: Number,
  weather: String
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
