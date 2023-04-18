require('dotenv').config();
const {app, httpServer}  = require("./Config/appServer");
const {routerCarrito} = require("./src/Router/carrito")
const {routerProductos} = require("./src/Router/productos")
const {routerUsuario} = require("./src/Router/usuario")
const {loggerWarn} = require("./Config/loggerConfig")
const PORT = process.env.PORT || 8080;

app.use("/", routerUsuario);
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

httpServer.listen(PORT, () => {
  console.log(`\nServidor http escuchando en el puerto http://localhost:${PORT}`);
});

app.use('*', (req, res) => {
  loggerWarn.warn({ metodo: req.method, descripcion: 'Ruta no implementada' });
  res.json({ error: '-2', description: 'Ruta no implementada' });
});
