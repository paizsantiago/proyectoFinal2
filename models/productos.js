const { Schema , model } = require('mongoose');

const productsSchema = new Schema({
    nombre: {type: String, required: true, max:100},   
    descripcion: {type: String, required: true, max:100},   
    codigo: {type: String, required: true, max:100},   
    thumbnail: {type: String, required: true, max:100},   
    precio: {type: Number, required: true},   
    stock: {type: Number, required: true, max:100},   
    timestamp: {type: Date, required: true},    
});

const ProductosDB = model('productos', productsSchema);

module.exports = {ProductosDB};