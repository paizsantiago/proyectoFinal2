const {DAO} = require('../daos/factory');
const Usuarios = require('../../models/usuario');
const { sendMsg, sendWspp } = require('../../Config/twilio');
const { mailCompraFinalizada } = require('../../Config/nodemailer');

const getCarrito = async (req) => {
  const username = req.user.email;
  const user = await Usuarios.find({ email: username });
  const idCart = user[0].carrito._id;
  const carritoUsuario = await DAO.carrito.getById(idCart);
  const productsCart = carritoUsuario.productos;
  productsCart.length > 0 ? (productsExist = true) : (productsExist = false);
  const carritoFinal = { productsCart, productsExist };
  return carritoFinal;
};

const postProductCart = async (req) => {
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
};

const postActualizarCarrito = async (req) => {
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
    : (carritoActualizado = newProductos.find((item) => item._id !== id));
  await DAO.carrito.updateCartById(
    carritoUserID,
    carritoUserTimestamp,
    carritoActualizado
  );
  return true;
};

const postFinalizarCompra = async (req) => {
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
};

module.exports = {
  getCarrito,
  postProductCart,
  postActualizarCarrito,
  postFinalizarCompra,
};
