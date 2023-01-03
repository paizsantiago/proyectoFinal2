import { Schema, model } from 'mongoose';
import ContenedorMongoose from '../../contenedores/ContenedorMongoose.js';

const CarritoSchema = new Schema({
  timestamp: { type: Date, required: true},
  productos: { type: Array, required: true},
});

const CarritosMongoose = model('carritos', CarritoSchema);
const ruta = 'mongodb+srv://santiagopaiz:7pUEtOwIzTYvQyOF@cluster0.cpghy3l.mongodb.net/?retryWrites=true&w=majority'

class CarritosDaoMongoose extends ContenedorMongoose{
    constructor(){
        super(ruta, CarritosMongoose);
    }

}

export default CarritosDaoMongoose;