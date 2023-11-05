var express = require('express');   //Requiere el módulo express
var router = express.Router();      //Carga el middleware direccionador de express

/* GET home page. */
router.get('/', function(req, res, next) {      //(acceso a obj pet, acceso a obj res, siguiente middleware en la pila)
  res.render('index', { title: 'Express' });    //renderiza la vista
  
});

module.exports = router;