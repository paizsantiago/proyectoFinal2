

const {Schema, model} = require('mongoose');
const ContenedorMongoose = require('../../contenedores/ContenedorMongoose');
 
const CarritoSchema = new Schema({
  timestamp: { type: Date, required: true},
  productos: { type: Array, required: true},
});

const CarritosMongoose = model('carritos', CarritoSchema);


class CarritosDaoMongoose extends ContenedorMongoose{
    constructor(){
        super(CarritosMongoose);
    }

}

module.exports = {CarritosDaoMongoose};