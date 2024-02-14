const Sequelize = require("sequelize");
const { models } = require("../models");

const maxIdleTime = 3600000; //variable de tiempo maximo

// ... (otros middleware y configuraciones)

// Middleware: Login requerido.
exports.loginRequired = function (req, res, next) {
    if (req.session.loginUser) {
        next();
    } else {
        console.log("Info: Se requiere inicio de sesión: inicia sesión y vuelve a intentarlo.");
        res.redirect('/login');
    }
};

// Middleware que permite pasar solo si el usuario conectado es:
// - administrador
// - o es el usuario a gestionar.
exports.adminOrMyselfRequired = (req, res, next) => {
    const isAdmin = !!req.session.loginUser?.isAdmin;
    const isMyself = req.load.user.id === req.session.loginUser?.id;

    if (isAdmin || isMyself) {
        next();
    } else {
        console.log('Ruta prohibida: no es el usuario conectado ni un administrador.');
        res.sendStatus(403);
    }
};

/*
 * Autenticación de usuario: Verifica que el usuario esté registrado.
 *
 * Busca un usuario con el correo electrónico dado y verifica que
 * la contraseña sea correcta.
 * Si la autenticación es correcta, devuelve el objeto de usuario.
 * Si la autenticación falla, devuelve null.
 */
const authenticate = async (email, password) => {
    const user = await models.User.findOne({ where: { email: email } });

    return user?.verifyPassword(password) ? user : null;
};

// GET /login -- Formulario de inicio de sesión
exports.new = (req, res, next) => {
    res.render('session/new');
};

// POST /login -- Crea la sesión si el usuario se autentica correctamente
exports.create = async (req, res, next) => {
    const email = req.body.email ?? "";
    const password = req.body.password ?? "";

    try {
        const user = await authenticate(email, password);
        if (user) {
            console.log('Info: Autenticación exitosa.');

            // Crea req.session.loginUser y guarda los campos id y email.
            // La existencia de req.session.loginUser indica que la sesión existe.
            // También guardo el momento en que la sesión caducará debido a la inactividad.
            req.session.loginUser = {
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
                expires: Date.now() + maxIdleTime,
            };

            res.redirect("/");
        } else {
            console.log('Error: La autenticación ha fallado. Vuelve a intentarlo.');
            res.render('session/new');
        }
    } catch (error) {
        console.log('Error: Se ha producido un error: ' + error);
        next(error);
    }
};

// DELETE /login -- Cierra la sesión
exports.destroy = (req, res, next) => {
    delete req.session.loginUser;
    res.redirect("/login"); // redirige a la página de inicio de sesión
};


// Middleware: Eliminar sesiones de usuario caducadas.
exports.deleteExpiredUserSession = (req, res, next) => {
    const now = Date.now();
  
    // Verifica si la sesión existe y si la marca de tiempo de caducidad ha pasado.
    if (req.session && req.session.cookie && req.session.cookie.expires < now) {
      console.log('Info: Sesión caducada. Eliminando sesión...');
      delete req.session.loginUser;
    }
  
    next();
  };