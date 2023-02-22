const ContenedorMemoria = require('../../contenedores/ContenedorMemoria');

const arrayMemoria = [];

class CarritosDaoMemoria extends ContenedorMemoria{
    constructor(){
        super(arrayMemoria);
    }
}

module.exports = {CarritosDaoMemoria};