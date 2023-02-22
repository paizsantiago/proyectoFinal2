const {ProductosDaoArchivo} = require('./productos/ProductosDaoArchivos');
const {CarritosDaoArchivo} = require('./carritos/CarritosDaoArchivo');
const {ProductosDaoMongoose} = require('./productos/ProductosDaoMongoose');
const {CarritosDaoMongoose} = require('./carritos/CarritosDaoMongoose');
const {ProductosDaoMemoria} = require('./productos/ProductosDaoMemoria');
const {CarritosDaoMemoria} = require('./carritos/CarritosDaoMemoria');
const {ProductosDaoFirebase} = require('./productos/ProductosDaoFirebase');
const {CarritosDaoFirebase} = require('./carritos/CarritosDaoFirebase');

// require('dotenv').config()
const { config } = require('dotenv');

config()

const instancias = [
    {
        nombre: ProductosDaoArchivo,
        id: 'archivo',
        descripcion: 'producto'
    },
    {
        nombre: CarritosDaoArchivo,
        id: 'archivo',
        descripcion: 'carrito'
    },
    {
        nombre: ProductosDaoMongoose,
        id: 'mongoose',
        descripcion: 'producto'
    },
    {
        nombre: CarritosDaoMongoose,
        id: 'mongoose',
        descripcion: 'carrito'
    },
    {
        nombre: ProductosDaoMemoria,
        id: 'memoria',
        descripcion: 'producto'
    },
    {
        nombre: CarritosDaoMemoria,
        id: 'memoria',
        descripcion: 'carrito'
    },
    {
        nombre: ProductosDaoFirebase,
        id: 'firebase',
        descripcion: 'producto'
    },
    {
        nombre: CarritosDaoFirebase,
        id: 'firebase',
        descripcion: 'carrito'
    }
]

const instancia = instancias.filter(i => i.id == process.env.INSTANCIA);

const resultado = {
    [instancia[0].descripcion]: instancia[0].nombre,
    [instancia[1].descripcion]: instancia[1].nombre,
}

module.exports = {resultado}