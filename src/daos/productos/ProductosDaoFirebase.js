import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js'

const configPrivi = '../../../privi.json';
const collection = 'productos';

class ProductosDaoFirebase extends ContenedorFirebase{
   constructor(){
    super(configPrivi, collection)
   }
}

export default ProductosDaoFirebase;