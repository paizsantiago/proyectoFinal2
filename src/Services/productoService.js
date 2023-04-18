// const { resultado } = require('../../src/daos/index');
// const producto = new resultado.producto();
const { validarProducto } = require('../../Config/validacion');
const {DAO} = require('../daos/factory');

const getProductos = async () => {
    const productos = await DAO.productos.getAll();
    let allProducts = {productsExist: true, products: productos} 
    if (productos === '[]') {
      let allProductos = {productsExist: false, products: []}
    }
    return allProducts;
};

const getLastProducts = async () =>{
  const productos = await DAO.productos.getAll();
  if (productos.length <= 3) {
      const reverse = productos.slice().reverse()
      return reverse;
  } else {
    const reverseProducts = productos.slice().reverse();
    const lastProducts = reverseProducts.slice(0, 3);
    return lastProducts;
  }
}

const getProductoId = async (req) => {
    const { id } = req.params;
    const productoPedido = await DAO.productos.getById(id);
    return productoPedido;
};

const postProduct = async (req) => {
      try {
        const { body } = req;
        validarProducto(body, true);
        const timestamp = new Date();
        const newProduct = { ...body, timestamp };
        await DAO.productos.save(newProduct);
      } catch (error) {
        console.log(error);
      }
    }

module.exports = {
  getProductoId,
  getProductos,
  postProduct,
  getLastProducts
}