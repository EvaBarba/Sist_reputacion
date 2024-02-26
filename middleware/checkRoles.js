//Vamos a utilizar este MW para verificar que role tiene el user (PENDIENTE DE HACER)

// middleware/checkRoles.js
const { USER_ROLES } = require('../constants');

module.exports = (requiredRoles) => (req, res, next) => {
  const { role } = req.session.loginUser;

  if (requiredRoles.includes(role)) {

    // El usuario tiene el rol necesario, permitir el acceso
    next();
    
  } else {
    // El usuario no tiene el rol necesario, redirigir o devolver un error
    res.status(403).send('No tienes permiso para acceder a esta página.');
  }
};