require('dotenv').config();
const mongoose = require ('mongoose');
let mode = process.env.MODE;
mode == "dev" ? mongoURL = process.env.MONGO_URL2 : mongoURL = process.env.MONGO_URL;

connectMG = async () =>{
    try {
        await mongoose.connect(mongoURL, {useNewUrlParser: true});
    } catch (e) {
        console.log(e);
        throw 'cannot connect to the db';
    }
}


mongoose.set("strictQuery", false);


module.exports = { 
    connectMG,
 }