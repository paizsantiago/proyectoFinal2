const { resultado } = require('../src/daos/index');
const producto = new resultado.producto();

const getProductos = async () => {
    const productos = await producto.getAll();
    let allProductos = {productsExist: true, products: productos} 
    if (productos === '[]') {
      let allProductos = {productsExist: false, products: []}
    }
    return allProductos;
  };

const getProductoId = async (req) => {
    const { id } = req.params;
    const productoPedido = await producto.getById(id);
    return productoPedido;
};

module.exports = {
  getProductoId,
  getProductos
}