const {
  getCarrito,
  postActualizarCarrito,
  postFinalizarCompra,
  postProductCart,
} = require('../Services/carritoService');
const { loggerError } = require('../../Config/loggerConfig')

const getCarritoController = async (req, res) => {
  try {
    const carrito = await getCarrito(req);
    res.render('carrito.pug', {
      productsExist: carrito.productsExist,
      products: carrito.productsCart,
    });
  } catch (error) {
    loggerError.error({msg: `${error}`})
  }
};

const postCarritoController = async (req, res) => {
  try {
    const result = await postProductCart(req);
    if (result) {
      res.redirect('/api/productos');
    } else {
      res.send('Ups algo salio mal');
    }
  } catch (error) {
    loggerError.error({msg: `${error}`})
  }
};

const deleteCarritoController = async (req, res) => {
  try {
    await postActualizarCarrito(req);
    res.redirect('/api/carrito');
  } catch (error) {
    loggerError.error({msg: `${error}`})
  }
};

const postFinalizarController = async (req, res) => {
  try {
    await postFinalizarCompra(req);
    res.redirect('/');
  } catch (error) {
    loggerError.error({msg: `${error}`})
  }
};

module.exports = {
  getCarritoController,
  postCarritoController,
  deleteCarritoController,
  postFinalizarController,
};
