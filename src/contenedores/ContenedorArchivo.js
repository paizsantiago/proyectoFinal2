import {promises as fs} from 'fs';

class ContenedorArchivo {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    save = async (objeto) =>{
        try {   
            if ( await fs.readFile(this.nombreArchivo, 'utf-8') === "") {
                fs.writeFile(this.nombreArchivo, "[]");
            }
            const productos = await this.getAll();
            const id =
                productos.length === 0
                    ? 1
                    : parseInt(productos[productos.length - 1].id) + 1;
            objeto.id = id.toString();
            let fileData = JSON.parse(await fs.readFile(this.nombreArchivo));
            let newData = [...fileData, objeto]
            await fs.writeFile(this.nombreArchivo, JSON.stringify(newData, null, 2));
        } catch (error) {
            console.log(error);
        }
    }

    getById  = async (id) =>{
        try {
            const resultado = await fs.readFile(this.nombreArchivo, 'utf-8');
            const obj = JSON.parse(resultado);
            const objetoPedido = obj.find(item => item.id === id);
            if (objetoPedido != undefined) {
                return objetoPedido;
            }
        } catch (error) {
            console.log("Error");
        }
    }

    updateById = async (id, nombre, precio, thumbnail, descripcion, codigo, timestamp, stock) => {
        try {
            const productos =  await this.getAll();
            const isInProductList = productos.find(prod => prod.id === id);
            const indexItem = productos.findIndex((prod) => prod.id === id);
            if (isInProductList != undefined) {
                const objeto = { id: id, nombre: nombre, precio: precio, thumbnail: thumbnail, descripcion: descripcion, codigo: codigo, timestamp: timestamp, stock: stock};
                productos[indexItem] = objeto;
                await fs.writeFile(
                    this.nombreArchivo,
                    JSON.stringify(productos, null, 2)
                );
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("error");
        }
    };


    updateCartById = async (id, timestamp, products) => {
        try {
            const productos = await this.getAll();
            const isInProductList = productos.find(prod => prod.id === id);
            const indexItem = productos.findIndex((prod) => prod.id === id);
            if (isInProductList != undefined) {
                const objeto = { id: id, timestamp:timestamp, productos: products};
                productos[indexItem] = objeto;
                await fs.writeFile(
                    this.nombreArchivo,
                    JSON.stringify(productos, null, 2)
                );
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log("error");
        }
    };

    


    getAll = async () => JSON.parse(await fs.readFile(this.nombreArchivo));

    

    deleteById = async (id) =>{
        try {
            const idParseado = parseInt(id);
            const resultado = await fs.readFile(this.nombreArchivo, 'utf-8');
            const obj = JSON.parse(resultado);
            idParseado--;
            obj.splice(idParseado, 1);
            await fs.writeFile(this.nombreArchivo, JSON.stringify(obj, null, 2)) 
            return obj;
        } catch (error) {
            console.log("Error id no encontrado");
        }
    }

    deteleAll = async () =>{
       await fs.writeFile(this.nombreArchivo, "[]");
    }

}


export default ContenedorArchivo;
