const { Router } = require('express');
const { checkAuth } = require('../Controller/usuarioController')
const {getAllProductosController, getProductoController, postProductController, getPostProductController} = require('../Controller/productoController');

const routerProductos = new Router();

routerProductos.get("/",  checkAuth , getAllProductosController);
routerProductos.get("/postProduct",  checkAuth , getPostProductController);
routerProductos.post("/", checkAuth , postProductController);
routerProductos.get("/:id",  checkAuth , getProductoController);

module.exports = {
    routerProductos
}