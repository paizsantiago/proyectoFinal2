const { resultado } = require('../daos/index');
const carrito = new resultado.carrito();
const producto = new resultado.producto();
const Usuarios = require('../../models/usuario');
const { sendMsg, sendWspp } = require('../../Config/twilio');
const { mailCompraFinalizada } = require('../../Config/nodemailer');

const getCarrito = async (req) => {
  const username = req.user.email;
  const user = await Usuarios.find({ email: username });
  const idCart = user[0].carrito._id;
  const carritoUsuario = await carrito.getById(idCart);
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
  const carritoDB = await carrito.getById(carritoUserID);
  let newProductos = carritoDB.productos;
  const productoPedido = await producto.getById(id);
  newProductos = [...newProductos, productoPedido];
  await carrito.updateCartById(
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
  const carritoDB = await carrito.getById(carritoUserID);
  let carritoActualizado;
  let newProductos = carritoDB.productos;
  newProductos.length === 1
    ? (carritoActualizado = [])
    : (carritoActualizado = newProductos.find((item) => item._id !== id));
  await carrito.updateCartById(
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
  const carritoDB = await carrito.getById(carritoUserID);
  console.log(carritoDB);
  mailCompraFinalizada(user[0], carritoDB.productos);
  await carrito.updateCartById(
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
