const mongoose = require ('mongoose');

connectMG = async () =>{
    try {
        await mongoose.connect("mongodb+srv://santiagopaiz:7pUEtOwIzTYvQyOF@cluster0.cpghy3l.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true});
    } catch (e) {
        console.log(e);
        throw 'cannot connect to the db';
    }
}

mongoose.set("strictQuery", false);


module.exports = { connectMG }