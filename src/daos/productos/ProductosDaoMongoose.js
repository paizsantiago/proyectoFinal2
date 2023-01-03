
import { Schema, model } from 'mongoose';
import ContenedorMongoose from '../../contenedores/ContenedorMongoose.js';

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

const ruta = "mongodb+srv://santiagopaiz:7pUEtOwIzTYvQyOF@cluster0.cpghy3l.mongodb.net/?retryWrites=true&w=majority";

class ProductosDaoMongoose extends ContenedorMongoose{
    constructor(){
        super(ruta, productosDB);
    }
}

export default ProductosDaoMongoose;