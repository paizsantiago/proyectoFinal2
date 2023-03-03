const { getCarrito, postActualizarCarrito, postFinalizarCompra, postProductCart} = require('../Services/carritoService')

const getCarritoController = async (req, res) => {
  const carrito = await getCarrito(req);
  res.render('carrito.pug', {
    productsExist: carrito.productsExist,
    products: carrito.productsCart,
  });
};

const postCarritoController = async (req, res) => {
  const result = await postProductCart(req);
  if (result) {
    res.redirect('/api/productos');
  } else {
    res.send('Ups algo salio mal');
  }
};

const deleteCarritoController = async (req, res) => {
  await postActualizarCarrito(req);
  res.redirect('/api/carrito');
};

const postFinalizarController = async (req, res) => {
  await postFinalizarCompra(req);
  res.redirect('/');
};


module.exports = {
    getCarritoController,
    postCarritoController,
    deleteCarritoController,
    postFinalizarController
}