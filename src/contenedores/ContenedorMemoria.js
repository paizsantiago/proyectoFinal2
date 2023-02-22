class ContenedorMemoria {
    constructor(arrayMemoria){
        this.arrayMemoria = arrayMemoria;
    }

    save = async (objeto) =>{
        try {
            const productos = await this.getAll();
            const id =
                productos.length === 0
                    ? 1
                    : parseInt(productos[productos.length - 1].id) + 1;
            objeto.id = id.toString();
            this.arrayMemoria.push(objeto);
        } catch (error) {
            console.log(error)
        }
    }

    getAll = async () =>{
        try {
            return this.arrayMemoria;
        } catch (error) {
            console.log(error)
        }
    }

    updateById = async (id, nombre, precio, thumbnail, descripcion, codigo, timestamp, stock) =>{
        try {
            const productos =  await this.getAll();
            const isInProductList = productos.find(prod => prod.id === id);
            const indexItem = productos.findIndex((prod) => prod.id === id);
            if (isInProductList != undefined) {
                const objeto = { id: id, nombre: nombre, precio: precio, thumbnail: thumbnail, descripcion: descripcion, codigo: codigo, timestamp: timestamp, stock: stock};
                productos[indexItem] = objeto;
                this.arrayMemoria = productos;
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("error");
        }
    }

    getById = async (id) =>{
        try {   
            const productoPedido = this.arrayMemoria.find((item) => item.id === id);
            if (productoPedido != undefined) {
                return productoPedido;
            }else{
                return [];
            }
        } catch (error) {
            console.log(error)
        }
    }

    updateCartById = async (id, timestamp, productos) =>{
        try {
            const isInProductList = this.arrayMemoria.find(prod => prod.id === id);
            const indexItem = this.arrayMemoria.findIndex((prod) => prod.id === id);
            if (isInProductList != undefined) {
                const objeto = { id: id, timestamp:timestamp, productos: productos};
                this.arrayMemoria[indexItem] = objeto;
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("error");
        }
    }

    deleteById = async (id) =>{
        try {
            const idParseado = parseInt(id);
            idParseado--;
            this.arrayMemoria.splice(idParseado, 1);
            return this.arrayMemoria;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorMemoria;