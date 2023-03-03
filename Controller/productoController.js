const { getProductoId, getProductos } = require('../Services/productoService')

const getProductoController = async (req, res) => {
  const producto = await getProductoId(req);
  res.json(producto);
};

const getAllProductosController = async (req, res) => {
  const result = await getProductos();
  res.render('productos.pug', {
    productsExist: result.productsExist,
    products: result.products,
  });
};

module.exports = { 
    getProductoController, 
    getAllProductosController
}
