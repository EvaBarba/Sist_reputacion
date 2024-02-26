var express = require('express');
var router = express.Router();

// Importa sessionController y otras dependencias necesarias
const sessionController = require('../controllers/session');
const userController = require("../controllers/user");
const reputationController = require("../controllers/reputation");
const checkRolesMiddleware = require('../middleware/checkRoles');

// ... (otras configuraciones)

//-----------------------------------------------------------
// autologout
router.use(sessionController.deleteExpiredUserSession);

//-----------------------------------------------------------
// Routes for the resource /session
router.get('/login', sessionController.new);     // login form
router.post('/login', sessionController.create);  // create session
router.delete('/login', sessionController.destroy); // close session

//-----------------------------------------------------------
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

// Autoload
router.param('user_id', userController.load);

// Routes for the resource /users
router.get('/users',
  sessionController.loginRequired,
  userController.index);
router.get('/users/:user_id(\\d+)',
  sessionController.loginRequired,
  userController.show);
router.get('/users/new',
  userController.new);
router.post('/users',
  userController.create);
router.get('/users/:user_id(\\d+)/edit',
  sessionController.adminOrMyselfRequired,
  userController.edit);
router.put('/users/:user_id(\\d+)',
  sessionController.adminOrMyselfRequired,
  userController.update);
router.delete('/users/:userId(\\d+)',
  sessionController.adminOrMyselfRequired,
  userController.destroy);

// Ejemplo de una ruta que requiere ser Administrador
router.get('/admin', checkRolesMiddleware(['Admin']), (req, res) => {
  res.render('admin/dashboard');
});

// Ejemplo de una ruta que requiere ser Intérprete o Cliente
router.get('/perfil', checkRolesMiddleware(['Interprete', 'Cliente']), (req, res) => {
  res.render('perfil/index');
});

module.exports = router;