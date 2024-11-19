var mongoose = require('mongoose');

// Estableciendo conexión con MongoDB
mongoose.connect('mongodb://localhost:27017/ucsm')
  .then(() => console.log('Conexión exitosa con MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

module.exports = mongoose;
