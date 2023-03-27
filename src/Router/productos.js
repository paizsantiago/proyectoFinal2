const { Router } = require('express');
const { checkAuth } = require('../Controller/usuarioController')
const {getAllProductosController, getProductoController, postProductController} = require('../Controller/productoController');

const routerProductos = new Router();

routerProductos.get("/", /* checkAuth ,*/ getAllProductosController);
routerProductos.get("/api/productos/:id", /*checkAuth,*/ getProductoController);
routerProductos.post("/", postProductController)

module.exports = {
    routerProductos
}