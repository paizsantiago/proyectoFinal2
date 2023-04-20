const passport = require("passport");
const Strategy = require("passport-local");
const bcrypt = require("bcrypt");
const Usuarios = require("../models/usuario")
const { mailRegister } = require('./nodemailer');
const {DAO} = require('../src/daos/factory');
const { validarUsuario } = require("./validacion");

function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
  }
  
  function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  }
  
  passport.use(
    'login',
    new Strategy((email, password, done) => {
      Usuarios.findOne({ email }, (err, user) => {
        if (err) return done(err);
  
        if (!user) {
          console.log("User not found");
          return done(null, false);
        }
  
        if (!isValidPassword(user, password)) {
          console.log("invalid password")
          return done(null, false);
        }
  
        return done(null, user);
      });
    })
  );
  
  passport.use(
    'signup',
    new Strategy(
      {
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        Usuarios.findOne({ email: username }, async function (err, user) {
          if (err) {
            console.log('Error in SignUp: ' + err);
            return done(err);
          }
  
          if (user) {
            console.log("Ese usuario ya existe")
            return done(null, false);
          }
  
          const timestamp = Date.now();
          const prueba = validarUsuario(req.body, true);
          if (prueba) {
            return done(null, false);
          }
          const idCarrito = await DAO.carrito.save({ timestamp });
  
          const newUser = {
            nombre: req.body.nombre,
            email: username,
            password: createHash(password),
            direccion: req.body.direccion,
            edad: req.body.edad,
            telefono: req.body.telefono,
            avatar: req.body.avatar,
            carrito: idCarrito,
          };
  
          mailRegister(newUser);
  
          Usuarios.create(newUser, (err, userWithId) => {
            if (err) {
              console.log('Error in Saving user: ' + err);
              return done(err);
            }
            console.log('User Registration succesful');
            return done(null, userWithId);
          });
        });
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    Usuarios.findById(id, done);
  });
  
