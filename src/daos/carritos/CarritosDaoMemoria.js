import ContenedorMemoria from "../../contenedores/ContenedorMemoria.js";

const arrayMemoria = [];

class CarritosDaoMemoria extends ContenedorMemoria{
    constructor(){
        super(arrayMemoria);
    }
}

export default CarritosDaoMemoria;