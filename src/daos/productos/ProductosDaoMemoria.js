const ContenedorMemoria = require('../../contenedores/ContenedorMemoria');

const arrayMemoria = [];

class ProductosDaoMemoria extends ContenedorMemoria{
    constructor(){
        super(arrayMemoria);
    }
}

module.exports = {ProductosDaoMemoria};