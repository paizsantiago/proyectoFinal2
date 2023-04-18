const { loggerError } = require('../../../Config/loggerConfig');
const {connectMG} = require('../../connectionDBMongoAtlas');

class ContenedorMongoose {
    constructor(collectionDB){
        this.collectionDB = collectionDB; 
        connectMG();
    }

    save = async (objeto) =>{
        try {
            const objetoAgregar = await new this.collectionDB({...objeto});
            objetoAgregar.save();
            return objetoAgregar;
        } catch (error) {
            loggerError.error({msg: `${error}`})
        }
    }

    getAll = async () =>{
        try {
            const allProducts = await this.collectionDB.find({});
            return allProducts;
        } catch (error) {
            loggerError.error({msg: `${error}`})
        }
    }

    getById = async (idNumber) =>{
        try {
            const productoPedido = await this.collectionDB.find({ _id: idNumber});
            return productoPedido[0];
        } catch (error) {
            loggerError.error({msg: `${error}`})
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
        loggerError.error({msg: `${error}`})
        return false;
       }
    }

    updateCartById = async (id, timestamp, productos) => {
        try {
            const verificar = await this.collectionDB.updateOne(
                {_id: id},
                {
                    $set:{
                        timestamp: timestamp,
                        productos: productos
                    }
                })
            
            if (verificar.matchedCount == 1) {
                const newCarrito = await this.getById(id);
                return newCarrito;
            }
        } catch (error) {
            loggerError.error({msg: `${error}`})
        }
    };

    deleteById = async (id) =>{
        try {
            await this.collectionDB();
            await this.collectionDB.deleteOne({_id: id});
            return this.collectionDB.find({});
        } catch (error) {
            loggerError.error({msg: `${error}`})
        }
    }
}

module.exports = {ContenedorMongoose};