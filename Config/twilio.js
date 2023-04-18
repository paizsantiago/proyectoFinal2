const twilio = require('twilio');
require('dotenv').config()

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const twilioNumber = process.env.TWILIONUMBER;

const client = twilio(accountSid, authToken);

const sendMsg = async (num) =>{
    try {
        const message = await client.messages.create({
            body: "Tu pedido fue recibido y esta en proceso",
            from: twilioNumber,
            to: `+549${num}`
        })
    } catch (error) {
        console.log(error)
    }
}   

const sendWspp= async (user, carrito) =>{
    const carritoParsed = JSON.stringify(carrito, null, 4)
    try {
        const message = await client.messages.create({
            body: `Nuevo pedido de ${user.nombre}, email: ${user.email}.
            Productos: ${carritoParsed}
            `,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5493454957242'
        })
    } catch (error) {
        console.log(error)
    }
}   


module.exports = {
    sendMsg,
    sendWspp
}

