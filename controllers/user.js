// controllers/user.js

// Importación de dependencias
const createError = require('http-errors');
const Sequelize = require("sequelize");
const { models } = require("../models");

// Middleware para Cargar un Usuario con :id
exports.load = async (req, res, next, id) => {
    try {
        const user = await models.User.findByPk(id);
        // OK: Se agrega el objeto req.load
        if (user) {
            req.load = {...req.load, user};
            next();
        } else {    // KO: error 404
            console.log('Error: There is no user with id=' + id + '.');
            throw createError(404,'No exist id=' + id);
        }
    } catch (error) {
        next(error);
    }
};


// GET (users) - Listado de Usuarios (index)
exports.index = async (req, res, next) => {
    try {
        const findOptions = {
            order: ['username'],
            include: [{ model: models.reputation, as: 'reputations' }],   // Incluye la relación con reputations
        };

        const users = await models.User.findAll(findOptions);
        res.render('users/index', { users });
    } catch (error) {
        next(error);
    }
};

// GET /users/:id - Detalles del usuario
exports.show = (req, res, next) => {

    const {user} = req.load;

    res.render('users/show', {user});
};


// GET /users/new - Crear usuario (new)
exports.new = (req, res, next) => {

    const user = {
        username: "",
        email: "",
        password: ""
    };

    res.render('users/new', {user});
};

// POST /users - Crear usuario (create)
exports.create = async (req, res, next) => {

    const {username, email, password} = req.body;

    let user = models.User.build({
        username,
        email,
        password
    });

    // Password must not be empty.
    if (!password) {
        console.log('Error: Password must not be empty.');
        return res.render('users/new', {user});
    }

    if (!email) {
        console.log('Error: email must not be empty.');
        return res.render('users/new', {user});
    }

    try {
        // Save into the data base
        user = await user.save({fields: ["username", "email", "password", "salt"]});
        
        console.log('Success: User created successfully.');
        if (req.session.loginUser) {
            res.redirect('/users/' + user.id);
        } else {
            res.redirect('/login'); // Redirection to the login page
        }
    } catch (error) {
        if (error instanceof Sequelize.UniqueConstraintError) {
            console.log(`Error: User "${email}" already exists.`);
            res.render('users/new', {user});
        } else if (error instanceof Sequelize.ValidationError) {
            console.log('Error: There are errors in the form:');
            error.errors.forEach(({message}) => console.log('Error:', message));
            res.render('users/new', {user});
        } else {
            next(error);
        }
    }
};


// GET /users/:id/edit - Editar usuario (edit)
exports.edit = (req, res, next) => {

    const {user} = req.load;

    res.render('users/edit', {user});
};

// PUT /users/:id  - Editar usuario (update)
exports.update = async (req, res, next) => {

    const {body} = req;
    const {user} = req.load;

    // user.username  = body.user.username; // edition not allowed

    let fields_to_update = [];

    // ¿Cambio el password?
    if (body.password) {
        console.log('Updating password');
        user.password = body.password;
        fields_to_update.push('salt');
        fields_to_update.push('password');
    }

    //IMPLEMENTAR EL CAMBIO DEL RESTO DE DATOS


    try {
        await user.save({fields: fields_to_update});
        console.log('Success: User updated successfully.');
        res.redirect('/users/' + user.id);
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            console.log('Error: There are errors in the form:');
            error.errors.forEach(({message}) => console.log('Error:', message));
            res.render('users/edit', {user});
        } else {
            next(error);
        }
    }
};


// DELETE /users/:id - Eliminar usuario (destroy)
exports.destroy = async (req, res, next) => {

    try {
        // Deleting logged user.
        if (req.session.loginUser?.id === req.load.user.id) {
            // Close the user session
            delete req.session.loginUser;
        }

        await req.load.user.destroy()
        console.log('Success: User deleted successfully.');
        res.redirect('/users');
    } catch (error) {
        next(error);
    }
};
