var express = require('express');   //Requiere el módulo express
var router = express.Router();      //Carga el middleware direccionador de express

/* GET home page. */
router.get('/', function (req, res, next) {      //(acceso a obj pet, acceso a obj res, siguiente middleware en la pila)
  res.render('index', { title: 'Express' });    //renderiza la vista

});

//EJEMPLO: Para publicar un post el usuario debe estar logueado.
router.get('/posts/new', sessionController.loginRequired, postController.new);

//EJEMPLO: El perfil de un usuario solo lo puede ver el propio usuario, o un usuario administrador.
router.get('/users/:userId(\\d+)',
  sessionController.adminOrMyselfRequired,
  userController.show
);

//EJEMPLO: La lista de usuarios registrados solo la puede ver un usuario administrador.
router.get('/users', sessionController.adminRequired, userController.index);

//EJEMPLO: Los posts solo pueden ser editados por su autor, o por un usuario administrador.
router.get('/posts/:postId(\\d+)/edit', postController.adminOrAuthorRequired, postController.edit);


//Para subir archivos, ejemplo tamaño maximo 20MB
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }
});


module.exports = router;