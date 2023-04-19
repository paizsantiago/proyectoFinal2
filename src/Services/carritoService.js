const { DAO } = require('../daos/factory');
const Usuarios = require('../../models/usuario');
const { sendMsg, sendWspp } = require('../../Config/twilio');
const { mailCompraFinalizada } = require('../../Config/nodemailer');
const { loggerError } = require('../../Config/loggerConfig');

const getCarrito = async (req) => {
  try {
    const username = req.user.email;
    const user = await Usuarios.find({ email: username });
    const idCart = user[0].carrito._id;
    const carritoUsuario = await DAO.carrito.getById(idCart);
    const productsCart = carritoUsuario.productos;
    productsCart.length > 0 ? (productsExist = true) : (productsExist = false);
    const carritoFinal = { productsCart, productsExist };
    return carritoFinal;
  } catch (error) {
    loggerError.error({ msg: `${error}` });
  }
};

const postProductCart = async (req) => {
  // agrega un producto al cart
  try {
    const { id } = req.params;
    const username = req.user.email;
    const user = await Usuarios.find({ email: username });
    const carritoUserID = user[0].carrito._id;
    const carritoUserTimestamp = user[0].carrito.timestamp;
    const carritoDB = await DAO.carrito.getById(carritoUserID);
    let newProductos = carritoDB.productos;
    const productoPedido = await DAO.productos.getById(id);
    newProductos = [...newProductos, productoPedido];
    await DAO.carrito.updateCartById(
      carritoUserID,
      carritoUserTimestamp,
      newProductos
    );
    return true;
  } catch (error) {
    loggerError.error({ msg: `${error}` });
  }
};

const postActualizarCarrito = async (req) => {
  // elimina un producto del cart
  try {
    const { id } = req.params;
    const username = req.user.email;
    const user = await Usuarios.find({ email: username });
    const carritoUserID = user[0].carrito._id;
    const carritoUserTimestamp = user[0].carrito.timestamp;
    const carritoDB = await DAO.carrito.getById(carritoUserID);
    let carritoActualizado;
    let newProductos = carritoDB.productos;
    newProductos.length === 1
      ? (carritoActualizado = [])
      : (carritoActualizado = newProductos.filter((item) => item._id != id));
    await DAO.carrito.updateCartById(
      carritoUserID,
      carritoUserTimestamp,
      carritoActualizado
    );
    return true;
  } catch (error) {
    loggerError.error({ msg: `${error}` });
  }
};

const postFinalizarCompra = async (req) => {
  // envia el mail y msg una vez finalizada la compra
  try {
    const vaciarCarrito = [];
    const username = req.user.email;
    const user = await Usuarios.find({ email: username });
    const carritoUserID = user[0].carrito._id;
    const carritoUserTimestamp = user[0].carrito.timestamp;
    const carritoDB = await DAO.carrito.getById(carritoUserID);
    mailCompraFinalizada(user[0], carritoDB.productos);
    await DAO.carrito.updateCartById(
      carritoUserID,
      carritoUserTimestamp,
      vaciarCarrito
    );
    sendMsg(user[0].telefono);
    sendWspp(user[0], carritoDB.productos);
  } catch (error) {
    loggerError.error({ msg: `${error}` });
  }
};

module.exports = {
  getCarrito,
  postProductCart,
  postActualizarCarrito,
  postFinalizarCompra,
};
