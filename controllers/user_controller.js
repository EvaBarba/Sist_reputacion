// controllers/user_controller.js

// Importación de dependencias
const createError = require('http-errors');
var Sequelize = require("sequelize");
var models = require('../models');

// Autoload the user associated with :user.id
exports.load = function (req, res, next, userId) {

    models.User.findById(user.id)
        .then(function (user) {
            if (user) {
                req.user = user;
                next();
            } else {
                req.flash('error', 'User with id = ' + userId + '  does not exist.');
                throw new Error('No existe userId=' + userId);
            }
        })
        .catch(function (error) {
            next(error);
        });
};


// GET /users
exports.index = async (req, res, next) => {

    try {
        const findOptions = {
            include: [
                { model: models.Admin, as: 'admin' },
                { model: models.Consultant, as: 'consultant' },
                { model: models.Coordinator, as: 'coordinator' },
                { model: models.Operator, as: 'operator' },
                { model: models.Technician, as: 'technician' },
                { model: models.Interpreter, as: 'interpreter' }
            ],
            order: ['email']
        }


        const users = await models.User.findAll(findOptions);

        // Function for like's average
        const avg = await models.Like.findAll({
            attributes: [
                [Sequelize.fn("AVG", Sequelize.col("value"), "avgValue")],
                "likeeType",
                "likeeId"
            ],
            group: ["likeeType", "likeeId"]
        });
        const avg2 = {}
        avg.forEach(obj => {
            avg2[obj.likeeType] ||= {}
            avg2[obj.likeeType][obj.likeeId] = obj.get("avgValue")
        })

        res.render('users/index', { users, likes: avg2 });

    } catch (error) {
        next(error)
    }
};

// GET /users/:userId
exports.show = async (req, res, next) => {

    res.render('users/show', { user: req.user });
};


// GET /users/new
exports.new = function (req, res, next) {

    var user = {
        username: "",
        password: ""
    };

    res.render('users/new', { user: user });
};


// POST /users
exports.create = function (req, res, next) {

    var user = models.User.build({
        username: req.body.username,
        password: req.body.password
    });

    // El login debe ser unico:
    models.User.find({ where: { username: req.body.username } })
        .then(function (existing_user) {

            if (existing_user) {
                var emsg = "El usuario \"" + req.body.username + "\" ya existe."
                req.flash('error', emsg);
                res.render('users/new', { user: user });
            } else {
                // Guardar en la BBDD
                return user.save({ fields: ["username", "password", "salt"] })
                    .then(function (user) { // Renderizar pagina de usuarios
                        req.flash('success', 'Usuario creado con éxito.');

                        if (req.session.user) {
                            res.redirect('/users/' + user.id);
                        } else {
                            res.redirect('/session'); // Redireccion a pagina de login
                        }
                    })
                    .catch(Sequelize.ValidationError, function (error) {
                        req.flash('error', 'Errores en el formulario:');
                        for (var i in error.errors) {
                            req.flash('error', error.errors[i].value);
                        }

                        res.render('users/new', { user: user });
                    });
            }
        })
        .catch(function (error) {
            next(error);
        });
};


// GET /users/:userId/edit
exports.edit = function (req, res, next) {

    res.render('users/edit', { user: req.user });
};


// PUT /users/:userId
exports.update = function (req, res, next) {

    // req.user.username  = req.body.user.username; // No se permite su edicion
    req.user.password = req.body.password;

    // El password no puede estar vacio
    if (!req.body.password) {
        req.flash('error', "El campo Password debe rellenarse.");
        return res.render('users/edit', { user: req.user });
    }

    req.user.save({ fields: ["password", "salt"] })
        .then(function (user) {
            req.flash('success', 'Usuario actualizado con éxito.');
            res.redirect('/users/' + user.id);
        })
        .catch(Sequelize.ValidationError, function (error) {

            req.flash('error', 'Errores en el formulario:');
            for (var i in error.errors) {
                req.flash('error', error.errors[i].value);
            }

            res.render('users/edit', { user: req.user });
        })
        .catch(function (error) {
            next(error);
        });
};


// DELETE /users/:userId
exports.destroy = function (req, res, next) {

    req.user.destroy()
        .then(function () {

            // Borrando usuario logeado.
            if (req.session.user && req.session.user.id === req.user.id) {
                // borra la sesión y redirige a /
                delete req.session.user;
            }

            req.flash('success', 'Usuario eliminado con éxito.');
            res.redirect('/goback');
        })
        .catch(function (error) {
            next(error);
        });
};

















// // Versión anterior al 29/02/2024

// // Middleware para Cargar un Usuario con :id
// exports.load = async (req, res, next, id) => {
//     try {
//         const user = await models.user.findByPk(id);
//         // OK: Se agrega el objeto req.load
//         if (user) {
//             req.load = { ...req.load, user };
//             next();
//         } else {    // KO: error 404
//             console.log('Error: There is no user with id=' + id + '.');
//             throw createError(404, 'No exist id=' + id);
//         }
//     } catch (error) {
//         next(error);
//     }
// };

// // // Middleware para Cargar un Usuario con email
// // exports.loadByEmail = async (req, res, next, email) => {
// //     try {
// //         const user = await models.user.findOne({ where: { email: email } });
// //         if (user) {
// //             req.load = { ...req.load, user };
// //             next();
// //         } else {
// //             console.log('Error: There is no user with email=' + email + '.');
// //             throw createError(404, 'No exist email=' + email);
// //         }
// //     } catch (error) {
// //         next(error);
// //     }
// // };


// // GET (users) - Listado de Usuarios (index)
// exports.index = async (req, res, next) => {
//     try {
//         const findOptions = {
//             order: ['email'],
//             // include: [{ model: models.reputation, as: 'reputations' }],   // Incluye la relación con reputations
//         };

//         const users = await models.user.findAll(findOptions);
//         res.render('users/index', { users });
//     } catch (error) {
//         next(error);
//     }
// };

// // GET /users/:id - Detalles del usuario
// exports.show = (req, res, next) => {

//     const { user } = req.load;

//     res.render('users/show', { user });
// };


// // GET /users/new - Crear usuario (new)
// exports.new = (req, res, next) => {

//     const user = {
//         email: "",
//         password: ""
//     };

//     res.render('users/new', { user });
// };

// // POST /users - Crear usuario (create)
// exports.create = async (req, res, next) => {

//     const { username, email, password } = req.body;

//     let user = models.user.build({
//         username,
//         email,
//         password
//     });

//     // Password must not be empty.
//     if (!password) {
//         console.log('Error: Password must not be empty.');
//         return res.render('users/new', { user });
//     }

//     if (!email) {
//         console.log('Error: email must not be empty.');
//         return res.render('users/new', { user });
//     }

//     try {
//         // Save into the data base
//         user = await user.save({ fields: ["username", "email", "password", "salt"] });

//         console.log('Success: User created successfully.');
//         if (req.session.loginUser) {
//             res.redirect('/users/' + user.id);
//         } else {
//             res.redirect('/login'); // Redirection to the login page
//         }
//     } catch (error) {
//         if (error instanceof Sequelize.UniqueConstraintError) {
//             console.log(`Error: User "${email}" already exists.`);
//             res.render('users/new', { user });
//         } else if (error instanceof Sequelize.ValidationError) {
//             console.log('Error: There are errors in the form:');
//             error.errors.forEach(({ message }) => console.log('Error:', message));
//             res.render('users/new', { user });
//         } else {
//             next(error);
//         }
//     }
// };


// // GET /users/:id/edit - Editar usuario (edit)
// exports.edit = (req, res, next) => {

//     const { user } = req.load;

//     res.render('users/edit', { user });
// };

// // PUT /users/:id  - Editar usuario (update)
// exports.update = async (req, res, next) => {

//     const { body } = req;
//     const { user } = req.load;

//     // user.username  = body.user.username; // edition not allowed

//     let fields_to_update = [];

//     // ¿Cambio el password?
//     if (body.password) {
//         console.log('Updating password');
//         user.password = body.password;
//         fields_to_update.push('salt');
//         fields_to_update.push('password');
//     }

//     //IMPLEMENTAR EL CAMBIO DEL RESTO DE DATOS


//     try {
//         await user.save({ fields: fields_to_update });
//         console.log('Success: User updated successfully.');
//         res.redirect('/users/' + user.id);
//     } catch (error) {
//         if (error instanceof Sequelize.ValidationError) {
//             console.log('Error: There are errors in the form:');
//             error.errors.forEach(({ message }) => console.log('Error:', message));
//             res.render('users/edit', { user });
//         } else {
//             next(error);
//         }
//     }
// };


// // DELETE /users/:id - Eliminar usuario (destroy)
// exports.destroy = async (req, res, next) => {

//     try {
//         // Deleting logged user.
//         if (req.session.loginUser?.id === req.load.user.id) {
//             // Close the user session
//             delete req.session.loginUser;
//         }

//         await req.load.user.destroy()
//         console.log('Success: User deleted successfully.');
//         res.redirect('/users');
//     } catch (error) {
//         next(error);
//     }
// };
