const { getProductoId, getProductos, postProduct } = require('../Services/productoService')

const getProductoController = async (req, res) => {
  const producto = await getProductoId(req);
  res.json(producto);
};

const getAllProductosController = async (req, res) => {
  try {
    const result = await getProductos();
    // res.render('productos.pug', {
    //   productsExist: result.productsExist,
    //   products: result.products,
    // });
    res.json(result.products)
  } catch (error) {
    console.log(error)
  }
};

const postProductController = async (req, res) =>{
      await postProduct(req);
      res.json({ msg: "Producto añadido con exito" })
}
module.exports = { 
    getProductoController, 
    getAllProductosController,
    postProductController
}
