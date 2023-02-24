const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: {type: String, required: true, max:100},
    email: {type: String, required: true, max:100},
    password: { type: String, required: true, max:100},
    direccion: {type: String, required: true, max:100},
    edad: {type: Number, required: true, max:100},
    telefono: {type: String, required: true},
    avatar: {type: String, required: true},
    carrito:{type: Object}
})

const Usuarios = mongoose.model("usuarios", UsuarioSchema);

module.exports = Usuarios;