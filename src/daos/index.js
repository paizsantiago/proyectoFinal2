import ProductosDaoArchivo from "./productos/ProductosDaoArchivos.js";
import CarritosDaoArchivo from "./carritos/CarritosDaoArchivo.js";
import ProductosDaoMongoose from "./productos/ProductosDaoMongoose.js";
import CarritosDaoMongoose from "./carritos/CarritosDaoMongoose.js";
import ProductosDaoMemoria from "./productos/ProductosDaoMemoria.js";
import CarritosDaoMemoria from "./carritos/CarritosDaoMemoria.js";
import ProductosDaoFirebase from "./productos/ProductosDaoFirebase.js";
import CarritosDaoFirebase from "./carritos/CarritosDaoFirebase.js";
import { config } from "dotenv";

config();

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

export default resultado;