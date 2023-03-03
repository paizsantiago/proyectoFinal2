const { getHome, getInfoUser } = require('../Services/usuarioService')

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}

const homeController =  (req, res) => {
    const request = req;
    const user =  getHome(request);
    res.render('home.pug', { user });
};

const getLoginController = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('login.pug');
  }
};

const getRegisterController = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    res.render('register.pug');
  }
};

const getLoginErrorController = (req, res) => {
    res.send("Error al loguearse");
}

const getRegisterErrorController =  (req, res) =>{
    res.send("Error al registrarse");
}

const postLogoutController = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.send('no pudo desloguear');
    } else {
      res.redirect('/login');
    }
  });
};

const infoController = async (req, res) => {
  const user = await getInfoUser(req);
  res.render('infoUser.pug', { infoUser: user });
};

module.exports = { checkAuth, homeController, getLoginController, getRegisterController, postLogoutController, infoController, getLoginErrorController, getRegisterErrorController}
