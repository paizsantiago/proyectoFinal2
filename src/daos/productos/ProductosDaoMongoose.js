
const { Schema , model } = require('mongoose');
const ContenedorMongoose = require('../../contenedores/ContenedorMongoose')

const productsSchema = new Schema({
    nombre: {type: String, required: true, max:100},   
    descripcion: {type: String, required: true, max:100},   
    codigo: {type: String, required: true, max:100},   
    thumbnail: {type: String, required: true, max:100},   
    precio: {type: Number, required: true, max:100},   
    stock: {type: Number, required: true, max:100},   
    timestamp: {type: Date, required: true},    
});

const productosDB = model('productos', productsSchema);


class ProductosDaoMongoose extends ContenedorMongoose{
    constructor(){
        super(productosDB);
    }
}

module.exports = {ProductosDaoMongoose};