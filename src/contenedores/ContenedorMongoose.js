const {connectMG}= require('../connection')

class ContenedorMongoose {
    constructor(collectionDB){
        this.collectionDB = collectionDB; 
        connectMG();
    }

    // async connectMG(){
    //     try {
    //         await connect(this.ruta, {useNewUrlParser: true});
    //     } catch (e) {
    //         console.log(e);
    //         throw 'cannot connect to the db';
    //     }
    // }

    save = async (objeto) =>{
        try {
            const objetoAgregar = await new this.collectionDB({...objeto});
            objetoAgregar.save();
        } catch (error) {
            console.log(error)
        }
    }

    getAll = async () =>{
        try {
            const allProducts = await this.collectionDB.find({});
            return allProducts;
        } catch (error) {
            console.log(error)
        }
    }

    getById = async (idNumber) =>{
        try {
            const productoPedido = await this.collectionDB.find({ _id: idNumber});
            return productoPedido[0];
        } catch (error) {
            console.log(error);
        }
    }

    updateById = async (id, nombre, precio, thumbnail, descripcion, codigo, timestamp, stock) =>{
       try {
        await this.collectionDB.updateOne(
            {_id: id},
            {
                $set: {
                    nombre: nombre,
                    precio: precio,
                    thumbnail: thumbnail,
                    descripcion: descripcion,
                    codigo: codigo,
                    timestamp: timestamp,
                    stock: stock
                }
            }
        )
        return true;
       } catch (error) {
        console.log(error)
        return false;
       }
    }

    updateCartById = async (id, timestamp, productos) => {
        try {
            await this.collectionDB.updateOne(
                {_id: id},
                {
                    $set:{
                        timestamp: timestamp,
                        productos: productos
                    }
                })
        } catch (error) {
            console.log(error);
        }
    };

    deleteById = async (id) =>{
        try {
            await this.collectionDB();
            await this.collectionDB.deleteOne({_id: id});
            return this.collectionDB.find({});
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ContenedorMongoose;