/*adminOrAuthorRequired:
Este MW aborta la petición en curso si el usuario logueado no es un administrador,
o no es el autor del post al que se refiere el parámetro de ruta :postId. */
exports.adminOrAuthorRequired = (req, res, next) => {
    const { post } = req.load;                                          //Recupera post del objeto req
    const isAdmin = !!req.session.loginUser?.isAdmin;                   //Comprueba si el user loggeado es admin
    const isAuthor = post.authorId === req.session.loginUser?.id;       //Comprueba que sea el autor del post
    if (isAdmin || isAuthor) {                                          //Si es admin o autor, siguiente MW
        next();
    } else {
        console.log('Petición denegada, no es admin or author');
        res.send(403);
    }
};