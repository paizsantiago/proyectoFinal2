
const { validarProducto } = require('../../Config/validacion');
const {DAO} = require('../daos/factory');
const { loggerError } = require('../../Config/loggerConfig')

const getProductos = async () => {
    try {
      const productos = await DAO.productos.getAll();
      let allProducts = {productsExist: true, products: productos} 
      if (productos === '[]') {
        let allProductos = {productsExist: false, products: []}
      }
    return allProducts;
    } catch (error) {
      loggerError.error({msg: `${error}`})
    }
};

const getLastProducts = async () =>{ // devuelve los ultimos 3 productos para mostrarlos en el home
  try {
    const productos = await DAO.productos.getAll();
    if (productos.length <= 3) {
        const reverse = productos.slice().reverse()
        return reverse;
    } else {
      const reverseProducts = productos.slice().reverse();
      const lastProducts = reverseProducts.slice(0, 3);
      return lastProducts;
    }
  } catch (error) {
    loggerError.error({msg: `${error}`})
  }
}

const getProductoId = async (req) => {
    try {
      const { id } = req.params;
      const productoPedido = await DAO.productos.getById(id);
      return productoPedido;
    } catch (error) {
      loggerError.error({msg: `${error}`})
    }
};

const postProduct = async (req) => {
      try {
        const { body } = req;
        validarProducto(body, true);
        const timestamp = new Date();
        const newProduct = { ...body, timestamp };
        await DAO.productos.save(newProduct);
      } catch (error) {
        loggerError.error({msg: `${error}`})
      }
    }

module.exports = {
  getProductoId,
  getProductos,
  postProduct,
  getLastProducts
}