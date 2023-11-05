exports.loginRequired = (req, res, next) => {

    //Si existe loginUser, redireccionar al siguiente MW, sino, redirecciona a /login
    if (req.session.loginUser) {
        next();
    } else {
        res.redirect('/login');
    }
};

//Autorizado si es admin o :user.id
exports.adminOrMyselfRequired = (req, res, next) => {
    const isAdmin = !!req.session.loginUser?.isAdmin;
    const isMyself = req.load.user.id === req.session.loginUser?.id;
    if (isAdmin || isMyself) {
        next();
    } else {
        console.log('Ruta prohibida: No es el usuario indicado o administrador.');
        res.send(403);  //403 forbidden, prohibido
    }
};

//Control de admin
exports.adminRequired = (req, res, next) => {
    if (!!req.session.loginUser?.isAdmin) {
        next();
    } else {
        console.log('Petición denegada, se requieren permisos de administrador.');
        res.send(403);  //403 forbidden, prohibido
    }
};
