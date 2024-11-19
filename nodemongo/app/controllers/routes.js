const express = require('express');
const bodyParser = require('body-parser');
const Product = require('../models/products');
const router = express.Router(); // Aquí inicializas el router

// Configurando el parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Middleware para log de solicitudes
router.use(function (req, res, next) {
  console.log('Request recibido en:', req.originalUrl);
  next();
});

// Rutas para la colección products
router.route('/products')
  .get(async function (req, res) {
    try {
      const products = await Product.find(); // Encuentra todos los productos
      res.json(products);
    } catch (error) {
      res.status(500).send('Error al obtener los productos: ' + error);
    }
  })
  .post(async function (req, res) {
    try {
      const product = new Product(req.body);
      await product.save(); // Guarda el nuevo producto
      res.json({ message: 'Producto registrado con éxito', product });
    } catch (error) {
      res.status(500).send('Error al crear el producto: ' + error);
    }
  });

module.exports = router;
