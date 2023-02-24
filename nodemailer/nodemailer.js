const nodemailer  = require('nodemailer');
require('dotenv').config()
const testmail = process.env.TESTMAIL;
const password = process.env.PASSWORD;
const TEST_MAIL = testmail;

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: password
    }
});


const mailRegister = async (user) =>{
    const mailOptions = {
        from: 'Servidor Node.js',
        to: TEST_MAIL,
        subject: 'Nuevo registro',
        html: `<h1>Nombre: ${user.nombre}</h1>
                <h2>Email: ${user.email}</h2>
                <h2>Edad: ${user.edad}</h2>
                <h2>Direccion: ${user.direccion}</h2>
                <h2>Telefono: ${user.telefono}</h2>
                <h2>Avatar: <img src=${user.avatar} style='width:20px, height:20px'></h2>
                `
            }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info)
    } catch (error) {
        console.log(error)
    }

}

const mailCompraFinalizada= async (user, carrito) =>{
    let productos = "";
    carrito.forEach((element) => {
       productos +=  `<h2>Producto: ${element.nombre}</h2>
       <h2>Precio: ${element.precio}</h2>
       `
    });
    const mailOptions = {
        from: 'Servidor Node.js',
        to: TEST_MAIL,
        subject: 'Nuevo pedido',
        html: `<h1>Nuevo pedido de ${user.nombre}, email: ${user.email}</h1>
                <h2>Orden de productos: ${productos.length} ${productos}</h2>
                `
            }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info)
    } catch (error) {
        console.log(error)
    }

}


module.exports = {
    mailRegister,
    mailCompraFinalizada
};
