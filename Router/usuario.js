const { Router } = require('express');
const { checkAuth } = require('../Controller/usuarioController')
const {homeController, getLoginController, getRegisterController, getLoginErrorController, getRegisterErrorController, postLogoutController, infoController} = require('../Controller/usuarioController')
const passport = require('passport')


const routerUsuario = new Router();

routerUsuario.get("/", checkAuth, homeController);

routerUsuario.get("/login", getLoginController);

routerUsuario.post("/login",
    passport.authenticate("login", { failureRedirect: "/loginErrorAuth"}), homeController)


routerUsuario.get("/register", getRegisterController);

routerUsuario.post("/register", 
    passport.authenticate("signup", { failureRedirect: "/registerErrorAuth" }), homeController)


routerUsuario.get("/loginErrorAuth", getLoginErrorController);

routerUsuario.get("/registerErrorAuth", getRegisterErrorController);

routerUsuario.post("/logout", postLogoutController);

routerUsuario.get("/infoUser", checkAuth, infoController);

module.exports = {
    routerUsuario
}
