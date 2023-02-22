const ContenedorFirebase = require('../../contenedores/ContenedorFirebase')

const configPrivi = '../../privi.json';
const collection = 'carritos';

class CarritosDaoFirebase extends ContenedorFirebase{
    constructor(){
        super(configPrivi, collection);
    }
}

module.exports = {CarritosDaoFirebase};