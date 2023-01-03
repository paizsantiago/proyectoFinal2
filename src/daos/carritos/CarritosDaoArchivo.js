import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class CarritosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('./src/DB/carrito.txt');
    }
}

export default CarritosDaoArchivo;