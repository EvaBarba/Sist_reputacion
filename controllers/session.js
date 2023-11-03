// POST /login -- Create the session if the user authenticates successfully
exports.create = async (req, res, next) => {

    const username = req.body.username ?? "";
    const password = req.body.password ?? "";
  
    try {
      const user = await authenticate(username, password);
  
      if (user) {
        console.log('Info: Authentication successful.');
        
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