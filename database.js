const mongoose = require('mongoose');

const connect = () => {
  mongoose.connect('mongodb://localhost/weather', { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Connected to MongoDB');
  });

  return db;
};

module.exports = { connect };
