const { Router } = require('express');
const { checkAuth } = require('../Controller/usuarioController')
const {getAllProductosController, getProductoController} = require('../Controller/productoController')

const routerProductos = new Router();

routerProductos.get("/", checkAuth, getAllProductosController);
routerProductos.get("/api/productos/:id", checkAuth, getProductoController);

module.exports = {
    routerProductos
}