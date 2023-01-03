import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class ProductosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('./src/DB/products.txt');
    }
}

export default ProductosDaoArchivo;