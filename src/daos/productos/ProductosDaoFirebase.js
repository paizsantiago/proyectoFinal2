const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');

const configPrivi = '../../privi.json';
const collection = 'productos';

class ProductosDaoFirebase extends ContenedorFirebase{
   constructor(){
    super(configPrivi, collection)
   }
}

module.exports = {ProductosDaoFirebase};