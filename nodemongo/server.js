var express = require('express');
var app = express();
var db = require('./app/models/db');
var Router = require('./app/controllers/routes');

var port = 3000;

app.use('/api', Router);

app.listen(port);
console.log('Ejecutándose en el puerto 3000');
