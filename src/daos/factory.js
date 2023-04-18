require('dotenv').config();
const {ContenedorMongoose} = require('./contenedores/ContenedorMongoose');
const {CarritosMongoose} = require('../../models/carrito');
const {ProductosDB} = require('../../models/productos');

let DAO = { carrito: new ContenedorMongoose(CarritosMongoose), productos: new ContenedorMongoose(ProductosDB) }

module.exports = {DAO}
