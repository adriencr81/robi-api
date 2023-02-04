const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const Weather = require('./models/weather');
const db = require('./database');

const apiKey = process.env.API_KEY;
const cities = [
  { insee: '81004', name: 'Albi' },
  { insee: '35238', name: 'Rennes' },
  { insee: '31555', name: 'Toulouse' }
];

async function fetchWeather(insee, name) {
  const url = `https://api.meteo-concept.com/api/forecast/daily/1/period/1?token=${apiKey}&insee=${insee}`;

  try {
    const response = await axios.get(url);
    const weatherData = new Weather({
      city: name,
      temperature: response.data.forecast.temp2m,
      wind: response.data.forecast.wind10m,
      weather: response.data.forecast.weather
    });
    await weatherData.save();
    console.log(`Weather data for ${name} saved successfully.`);
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  await db.connect();
  for (const city of cities) {
    await fetchWeather(city.insee, city.name);
  }
  db.connect();
})();

// url api pollution
//https://api.waqi.info/feed/albi/?token=