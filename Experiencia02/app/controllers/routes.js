var express = require('express');
var bodyParser = require('body-parser');
var Product = require('../models/products');
var router = express.Router();

// Configurando el Parser

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

router.use(function(req,res,next){
    console.log("request");
    next();
});

// Metodos para manejar Base de Datos mongoDB llamada node-crud
router.route('/products')
.post(function(req,res){
    var product = new Product();
    product.name = req.body.name;
    product.amount = req.body.amount;
    product.description = req.body.description;
    //Modificacion en product.save para adaptar a versiones modernas
    product.save()
    .then(() => {
        res.json({ message: "Producto registrado con éxito" });
    })
    .catch(error => {
        res.status(500).send("Error en el servicio: " + error.message);
    });
})
.get(function(req,res){
    /*
    Sin utilidad en versiones recientes
    Product.find(function(error,products){
        if (error)
            res.status(500).send("Error en el servicio"+error);
        res.json(products);
    */

        Product.find()
        .then(products => res.json(products)) // Envía los productos si no hay errores
        .catch(error => res.status(500).send("Error en el servicio: " + error.message));
});

module.exports = router;