import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js'

const configPrivi = '../../../privi.json';
const collection = 'carritos';

class CarritosDaoFirebase extends ContenedorFirebase{
    constructor(){
        super(configPrivi, collection);
    }
}

export default CarritosDaoFirebase;