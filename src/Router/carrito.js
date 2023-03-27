const { Router } = require('express');
const { checkAuth } = require('../Controller/usuarioController');
const {
  getCarritoController,
  postCarritoController,
  deleteCarritoController,
  postFinalizarController,
} = require('../Controller/carritoController');

const routerCarrito = new Router();

routerCarrito.get('/', checkAuth, getCarritoController);
routerCarrito.post('/:id', checkAuth, postCarritoController);
routerCarrito.post('/newCarrito/:id', checkAuth, deleteCarritoController);
routerCarrito.post('/', checkAuth, postFinalizarController);

module.exports = {
  routerCarrito,
};
