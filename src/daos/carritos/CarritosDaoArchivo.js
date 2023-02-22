
const  ContenedorArchivo  = require('../../contenedores/ContenedorArchivo');

class CarritosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('./src/DB/carrito.txt');
    }
}

module.exports = {CarritosDaoArchivo};