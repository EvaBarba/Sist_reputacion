// POST /login -- Create the session if the user authenticates successfully
exports.create = async (req, res, next) => {

    //Si estaos valores son null/undefined, devolver "".
    const username = req.body.username ?? "";
    const password = req.body.password ?? "";
  
    try {
      //Comprueba autenticación del usuario
      const user = await authenticate(username, password);
  
      if (user) {
        console.log('Info: Authentication successful.');
        
        //Si se autentica correctamente, rellenan la propiedad req.session.loginUser con los datos del usuario
        req.session.loginUser = {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
          email: user.email,
          expires: Date.now() + maxIdleTime
        };
        
        res.redirect("/");
      } else {
        console.log('Error: Authentication has failed. Retry it again.');
        res.render('session/new');
      }
    } catch (error) {
      console.log('Error: An error has occurred: ' + error);
      next(error);
    }
  };