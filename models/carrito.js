const {Schema, model} = require('mongoose');
 
const CarritoSchema = new Schema({
  timestamp: { type: Date, required: true},
  productos: { type: Array},
});

const CarritosMongoose = model('carritos', CarritoSchema);

module.exports = {CarritosMongoose};