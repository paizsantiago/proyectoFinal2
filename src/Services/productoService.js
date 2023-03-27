const { resultado } = require('../../src/daos/index');
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

const postProduct = async (req) => {
      try {
        const { body } = req;
        const timestamp = new Date();
        const newProduct = { ...body, timestamp };
        await producto.save(newProduct);
        return newProduct;
      } catch (error) {
        console.log(error);
      }
    }

module.exports = {
  getProductoId,
  getProductos,
  postProduct
}