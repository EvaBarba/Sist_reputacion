//routes/index.js
var express = require('express');
var router = express.Router();

// Import controllers
const sessionController = require('../controllers/session_controller');
const userController = require('../controllers/user_controller');

//-----------------------------------------------------------
// Autologout
router.all('*', sessionController.deleteExpiredUserSession);

//-----------------------------------------------------------

/* History (user's browsing history)
*  When accessing 'goBack' you are redirected to the previous url stored in the session.
*  Saves the current URL in the session before handling GET requests on paths that do not end in "/new", "/edit", "/play", "/check", "/session", or "/:id".
*  This facilitates the implementation of a custom "back" button, allowing the user to return to the previous page. 
*/
function redirectBack(req, res, next) {

  var url = req.session.backURL || "/";
  delete req.session.backURL;
  res.redirect(url);
}

router.get('/goback', redirectBack);

// GET routes that do not end in /new, /edit, /play, /check, /session, or /:id.
router.get(/(?!\/new$|\/edit$|\/play$|\/check$|\/session$|\/(\d+)$)\/[^\/]*$/, function (req, res, next) {

  req.session.backURL = req.url;
  next();
});

//-----------------------------------------------------------

// Login routes (PENDIENTE)
router.get('/session', sessionController.new);        // Login form
router.post('/session', sessionController.create);    // Crteate session
router.delete('/session', sessionController.destroy); // Destroy session

//-----------------------------------------------------------

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

// Autoload
router.param('userId', userController.load);


// Routes for the resource /users
router.get('/users',                      // List of users
  //sessionController.loginRequired,
  userController.index);   
router.get('/users/:userId(\\d+)',        // View an user
  //sessionController.loginRequired,
  userController.show);
router.get('/users/new',                  // Sign in form
  userController.new);
router.post('/users',                     // Register an user
  userController.create);
router.get('/users/:userId(\\d+)/edit',   // Edit account information
  //sessionController.loginRequired,
  //sessionController.adminOrMyselfRequired,
  userController.edit);                   // Update account information
router.put('/users/:userId(\\d+)',
  //sessionController.loginRequired,
  //sessionController.adminOrMyselfRequired,
  userController.update);
router.delete('/users/:userId(\\d+)',     // Delete account
  //sessionController.loginRequired,
  //sessionController.adminOrMyselfRequired,
  userController.destroy); 

module.exports = router;