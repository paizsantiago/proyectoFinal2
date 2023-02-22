const ContenedorArchivo = require("../../contenedores/ContenedorArchivo")

class ProductosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('./src/DB/products.txt');
    }
}

module.exports = { ProductosDaoArchivo };