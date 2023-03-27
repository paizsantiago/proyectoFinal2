const {app, httpServer}  = require("./Config/appServer");
const {routerCarrito} = require("./src/Router/carrito")
const {routerProductos} = require("./src/Router/productos")
const {routerUsuario} = require("./src/Router/usuario")
const {loggerWarn} = require("./Config/loggerConfig")
const PORT = process.env.PORT || 8080;

app.use("/", routerUsuario);
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

const server = httpServer.listen(PORT, () => {
  console.log(`\nServidor http escuchando en el puerto http://localhost:${PORT}`);
});

server.on("Error", (error) => console.log(`Error en servidor ${error}`))

app.use('*', (req, res) => {
  loggerWarn.warn({ metodo: req.method, descripcion: 'Ruta no implementada' });
  res.json({ error: '-2', description: 'Ruta no implementada' });
});

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
