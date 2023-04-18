const Joi = require("joi")

const validarProducto = (producto, requerido) => {
     const productoSchema = Joi.object({
        nombre: requerido ? Joi.string().required() : Joi.string(),
        descripcion: requerido ? Joi.string().required() : Joi.string(),
        codigo: requerido ? Joi.string().required() : Joi.string(),
        precio: requerido ? Joi.number().required() : Joi.number(),
        thumbnail: requerido ? Joi.string().required() : Joi.string(),
        stock: requerido ? Joi.string().required() : Joi.string(),
    })
    const {error} = productoSchema.validate(producto);
    if (error) {
        throw error;
    }
}

const validarUsuario = (user, requerido) => {
    const userSchema = Joi.object({
       nombre: requerido ? Joi.string().required() : Joi.string(),
       username: requerido ? Joi.string().required() : Joi.string(),
       password: requerido ? Joi.string().required() : Joi.string(),
       direccion: requerido ? Joi.string().required() : Joi.string(),
       edad: requerido ? Joi.number().required() : Joi.number(),
       telefono: requerido ? Joi.string().required() : Joi.string(),
       avatar: requerido ? Joi.string().required() : Joi.string(),
   })
   const {error} = userSchema.validate(user);
   if (error) {
       throw error;
   }
}

module.exports = {
    validarProducto,
    validarUsuario
}