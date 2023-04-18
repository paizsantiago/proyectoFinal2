const { getProductoId, getProductos, postProduct } = require('../Services/productoService')

const getProductoController = async (req, res) => {
  const producto = await getProductoId(req);
  res.render('productoUnico.pug', {producto: producto})
};

const getAllProductosController = async (req, res) => {
  try {
    const result = await getProductos();
    res.render('productos.pug', {
      productsExist: result.productsExist,
      products: result.products,
    });
  } catch (error) {
    loggerError.error({msg: `${error}`})
  }
};

const getPostProductController = (req, res) =>{
    res.render("postProducto.pug");
}

const postProductController = async (req, res) =>{
      try {
        await postProduct(req);
        res.redirect('/api/productos')
      } catch (error) {
        loggerError.error({msg: `${error}`})
      }
}
module.exports = { 
    getProductoController, 
    getAllProductosController,
    postProductController,
    getPostProductController
}
