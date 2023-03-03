const {app, httpServer}  = require("./Config/appServer");
const {routerCarrito} = require("./Router/carrito")
const {routerProductos} = require("./Router/productos")
const {routerUsuario} = require("./Router/usuario")
const {loggerWarn} = require("./Config/loggerConfig")
const PORT = process.env.PORT || 8080;


// let isAdmin = true; boolean para verificar los roles del usuario, al ser true esta permitido que el mismo ingrese en todos los metodos, de lo contrario solo podra ingresar a ciertos metodos.

const server = httpServer.listen(PORT, () => {
  console.log(`\nServidor http escuchando en el puerto http:localhost://${PORT}`);
});

server.on("Error", (error) => console.log(`Error en servidor ${error}`));

app.use("/", routerUsuario);
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);
// app.get('/login', getLogin);

// app.post(
//   '/login',
//   passport.authenticate('login', { failureRedirect: '/loginErrorAuth' }),
//   getLogin
// );

// app.get('/loginErrorAuth', (req, res) => {
//   res.send(errorPassport);
// });

// app.get('/register', getRegister);

// app.post(
//   '/register',
//   passport.authenticate('signup', { failureRedirect: '/registerErrorAuth' }),
//   getRegister
// );

// app.get('/registerErrorAuth', (req, res) => {
//   res.send(errorPassport);
// });

// app.post('/logout', postLogout);

// app.get('/infoUser', getInfoUser);

//rutas productos

// routerProducts.get('/', getProductos);

// routerProducts.get('/:id', getProductoId);

// routerProducts.delete(
//   '/:id',
//   (req, res, next) => {
//     if (isAdmin === true) {
//       next();
//     } else {
//       res
//         .status(401)
//         .json({
//           error: '-1',
//           description: `Ruta /api/products DELETE no autorizada, solo administradores`,
//         });
//     }
//   },
//   async (req, res) => {
//     const { id } = req.params;
//     const productosArray = await producto.getAll();
//     const productoPedido = await producto.deleteById(id);
//     if (productosArray.length < id) {
//       res.json({ error: 'true', msg: 'El producto no existe' });
//     } else {
//       res.json({
//         success: 'true',
//         msg: 'Producto eliminado',
//         newProductList: productoPedido,
//       });
//     }
//   }
// );

// routerProducts.post(
//   '/',
//   (req, res, next) => {
//     if (isAdmin === true) {
//       next();
//     } else {
//       res
//         .status(401)
//         .json({
//           error: '-1',
//           description: `Ruta /api/products DELETE no autorizada, solo administradores`,
//         });
//     }
//   },
//   async (req, res) => {
//     try {
//       const { body } = req;
//       const timestamp = new Date();
//       const newProduct = { ...body, timestamp };
//       await producto.save(newProduct);
//       res.json({ succes: true, description: 'Producto agregado con exito' });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// routerProducts.put(
//   '/:id',
//   (req, res, next) => {
//     if (isAdmin === true) {
//       next();
//     } else {
//       res
//         .status(401)
//         .json({
//           error: '-1',
//           description: `Ruta /api/products DELETE no autorizada, solo administradores`,
//         });
//     }
//   },
//   async (req, res) => {
//     try {
//       const { id } = req.params;
//       const timestamp = Date.now();
//       const { nombre, precio, thumbnail, descripcion, codigo, stock } =
//         req.body;
//       const boolean = await producto.updateById(
//         id,
//         nombre,
//         precio,
//         thumbnail,
//         descripcion,
//         codigo,
//         timestamp,
//         stock
//       );
//       if (boolean) {
//         res.json({
//           succes: true,
//           description: 'Producto modificado con exito',
//         });
//       } else {
//         res.json({ succes: false, description: 'Producto no encontrado' });
//       }
//     } catch (error) {
//       console.log('error');
//     }
//   }
// );

//rutas carrito

// app.get('/api/carrito', getCarrito);

// app.post('/api/carrito/:id', postProductCart);

// app.post('/api/newCarrito/:id', postActualizarCarrito);

// app.post('/finalizarCompra', postFinalizarCompra);

app.use('*', (req, res) => {
  loggerWarn.warn({ metodo: req.method, descripcion: 'Ruta no implementada' });
  res.json({ error: '-2', description: 'Ruta no implementada' });
});
