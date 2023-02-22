const express = require("express");
const bodyParser = require("body-parser");
const {getProductos, getHomeId, getRegister, postRegister, getHome, postLogout, getLogin, getInfoUser} = require("./routes/routes");
const { loggerWarn } = require("./logger/loggerConfig");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");
const MongoStore = require("connect-mongo");
const mongoURL = process.env.MONGOURL;
const Usuarios = require("./models/usuario")
const PORT = process.env.PORT || 8080;

const { Router } = express;

const app = express();
const routerProducts = Router();
const routerCarrito = Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// views pug
app.set("view engine", "pug");
app.set("views", "./views");

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCarrito);



let isAdmin = true; // boolean para verificar los roles del usuario, al ser true esta permitido que el mismo ingrese en todos los metodos, de lo contrario solo podra ingresar a ciertos metodos.

app.listen(PORT, ()=>{
    console.log(`La app esta escuchando en el puerto http://localhost:${PORT}`);
})

// SESSION

let errorPassport;

app.use(
    session({
      store: MongoStore.create({
        mongoUrl: mongoURL,
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      }),
      secret: "secreto",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 600000,
      },
    })
  );


// PASSPORT

function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
  }
  
  function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  }
  
  passport.use(
    "login",
    new LocalStrategy((email, password, done) => {
      Usuarios.findOne({ email }, (err, user) => {
        if (err) return done(err);
  
        if (!user) {
          errorPassport = "User Not Found with email " + email;
          return done(null, false);
        }
  
        if (!isValidPassword(user, password)) {
          errorPassport = "Invalid Password";
          return done(null, false);
        }
  
        return done(null, user);
      });
    })
  );
  
  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        Usuarios.findOne({ email: username }, function (err, user) {
          if (err) {
            console.log("Error in SignUp: " + err);
            return done(err);
          }
  
          if (user) {
            errorPassport = "User already exists";
            return done(null, false);
          }
  
          const newUser = {
            nombre: req.body.nombre,
            email: username,
            password: createHash(password),
            direccion: req.body.direccion,
            edad: req.body.edad, 
            telefono: req.body.telefono,
            avatar: req.body.avatar
          };
  
          Usuarios.create(newUser, (err, userWithId) => {
            if (err) {
              console.log("Error in Saving user: " + err);
              return done(err);
            }
            console.log(newUser);
            console.log("User Registration succesful");
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
  
  app.use(passport.initialize());
  app.use(passport.session());

  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/login");
    }
  }

//  RUTAS de login y register

app.get("/", checkAuth, getHome)

app.get("/login", getLogin)

app.post(
    "/login",
    passport.authenticate("login", { failureRedirect: "/loginErrorAuth" }),
    getLogin
  );

app.get("/loginErrorAuth", (req, res)=>{
    res.send(errorPassport)
})

app.get("/register", getRegister)

app.post("/register", 
    passport.authenticate("signup", { failureRedirect: "/registerErrorAuth" }),
    getRegister
);

app.get("/registerErrorAuth", (req, res)=>{
    res.send(errorPassport)
})

app.post("/logout", postLogout);

app.get("/infoUser", getInfoUser);

//rutas productos

routerProducts.get('/', getProductos);

routerProducts.get('/:id', getHomeId);

routerProducts.delete('/:id', 
        (req, res, next) =>{
            if(isAdmin === true){
                next();
            }else{
                res.status(401).json({error: "-1", description: `Ruta /api/products DELETE no autorizada, solo administradores`})
            }
        },async (req, res) =>{
            const {id} = req.params;
            const productosArray = await producto.getAll();
            const productoPedido = await producto.deleteById(id);
            if (productosArray.length < id) {
                res.json({error: "true", msg: "El producto no existe"})
            } else {
                res.json({
                    success: "true",
                    msg: "Producto eliminado",
                    newProductList: productoPedido
                });
            }
});

routerProducts.post('/', 
    (req, res, next) =>{
        if(isAdmin === true){
            next();
        }else{
            res.status(401).json({error: "-1", description: `Ruta /api/products DELETE no autorizada, solo administradores`})
        }
    }
    ,async (req, res) => {
        try {
            const {body} = req;
            const timestamp = new Date();
            const newProduct = {...body, timestamp}
            await producto.save(newProduct);
            res.json({succes: true, description: "Producto agregado con exito"});
        } catch (error) {
            console.log(error)
        }
});

routerProducts.put('/:id', 
    (req, res, next) =>{
        if(isAdmin === true){
            next();
        }else{
            res.status(401).json({error: "-1", description: `Ruta /api/products DELETE no autorizada, solo administradores`})
        }
    }
    ,async (req, res) => {
        try {
            const { id } = req.params;
            const timestamp = Date.now();
            const { nombre, precio, thumbnail, descripcion, codigo, stock} = req.body;
            const boolean = await producto.updateById(id, nombre, precio, thumbnail, descripcion, codigo, timestamp, stock);
            if (boolean) {
                res.json({succes: true, description: "Producto modificado con exito"});
            } else{
                res.json({succes: false, description: "Producto no encontrado"});
            }  
        } catch (error) {
            console.log("error")
        }
});

//rutas carrito

routerCarrito.post('/', async (req, res)=>{
    const timestamp = new Date();
    const newCarrito = {timestamp: timestamp, productos: []};
    await carrito.save(newCarrito);
    const allCarts = await carrito.getAll();
    res.json({succes: true, msg: "Carrito creado con exito", cartID: allCarts.length})
})

routerCarrito.delete('/', async (req, res)=>{
    await carrito.deteleAll();
    res.json({succes: true, msg: "Se eliminaron todos los carritos"})
})

routerCarrito.get('/:id/productos', async (req, res)=>{
    try {
        const {id} = req.params;
        const allCarts = await carrito.getAll();
        const productsCart = allCarts.find((item) => item.id === id);
        res.json({cartID: id, productList: productsCart.productos})
    } catch (error) {
        res.json({error: true, msg: "Carrito no encontrado"});
    }
})

routerCarrito.post('/:id/productos/:id_prod' , async (req, res)=>{
        const {id, id_prod} = req.params;
        const productoPedido = await producto.getById(id_prod);
        if (productoPedido != null) {
            const allCarts = await carrito.getAll();
            const cartPedido = allCarts.find((item) => item.id === id);
            const newProductList = [...cartPedido.productos, productoPedido];
            carrito.updateCartById(id, cartPedido.timestamp, newProductList);
            res.json({succes: true, msg: "Producto añadido al carrito!"})
        } else {
            res.json({error: true, msg: "Producto no encontrado"})
        }
})

routerCarrito.delete('/:id/productos/:id_prod' , async (req, res)=>{
    const {id, id_prod} = req.params;
    const allCarts = await carrito.getAll();
    const cartPedido = allCarts.find((item) => item.id === id);
    const newCarrito = cartPedido.productos.filter((item) => item.id !== id_prod);
    if (newCarrito.length === cartPedido.productos.length) {
        res.json({error: true, msg: "Producto no encontrado en el carrito"})
    }else{
        carrito.updateCartById(cartPedido.id, cartPedido.timestamp, newCarrito);
        res.json({succes: true, msg: "Producto eliminado con exito al carrito!"})
    }
})

app.use('*', (req, res)=>{
    loggerWarn.warn({metodo: req.method, descripcion: "Ruta no implementada"});
    res.json({error: "-2", description: "Ruta no implementada"});
})