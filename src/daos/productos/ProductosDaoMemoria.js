import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";

const arrayMemoria = [];

class ProductosDaoMemoria extends ContenedorMemoria{
    constructor(){
        super(arrayMemoria);
    }
}

export default ProductosDaoMemoria;