import instancia from "./src/daos/index.js";
import express from "express";
import bodyParser from "body-parser";

const producto = new instancia.producto;
const carrito = new instancia.carrito;

const { Router } = express;

const app = express();
const routerProducts = Router();
const routerCarrito = Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCarrito);

const PORT = process.env.PORT || 8080;

let isAdmin = true; // boolean para verificar los roles del usuario, al ser true esta permitido que el mismo ingrese en todos los metodos, de lo contrario solo podra ingresar a ciertos metodos.

app.listen(PORT, ()=>{
    console.log(`La app esta escuchando en el puerto http://localhost:${PORT}`);
})

app.use('*', (req, res)=>{
    res.json({error: "-2", description: "Ruta no implementada"});
})

//rutas productos

routerProducts.use((req, res, next)=>{ //middleware
    console.log('estan ingresando a la ruta /api/products');
    next();
})

routerProducts.get('/', 
    async (req, res)=>{
        const productos = JSON.stringify(await producto.getAll());
        if (productos == "[]")  {
            res.json({error: true, msg: "Productos no encontrados"});
        } else {
            const respuesta = JSON.parse(productos);
            res.json(respuesta);
        }
    }    
);

routerProducts.get('/:id', async (req, res) =>{
    const {id} = req.params;
    const productosArray = await producto.getAll();
    const productoPedido = await producto.getById(id);
    if (productosArray.length < id) {
        res.json({error: "true", msg: "El producto no existe"})
    } else {
        res.json(productoPedido);
    }
});

routerProducts.delete('/:id', 
        (req, res, next) =>{
            if(isAdmin === true){
                next();
            }else{
                res.status(401).json({error: "-1", description: `Ruta /api/products DELETE no autorizada, solo administradores`})
            }
        },async (req, res) =>{
            const {id} = req.params;
            const productosArray = await producto.getAll();
            const productoPedido = await producto.deleteById(parseInt(id));
            if (productosArray.length < id) {
                res.json({error: "true", msg: "El producto no existe"})
            } else {
                res.json({
                    success: "true",
                    msg: "Producto eliminado",
                    productList: productoPedido
                });
            }
});

routerProducts.post('/', 
    (req, res, next) =>{
        if(isAdmin === true){
            next();
        }else{
            res.status(401).json({error: "-1", description: `Ruta /api/products DELETE no autorizada, solo administradores`})
        }
    }
    ,async (req, res) => {
        try {
            const {body} = req;
            const timestamp = new Date();
            const newProduct = {...body, timestamp}
            await producto.save(newProduct);
            res.json({succes: true, description: "Producto agregado con exito"});
        } catch (error) {
            console.log(error)
        }
});

routerProducts.put('/:id', 
    (req, res, next) =>{
        if(isAdmin === true){
            next();
        }else{
            res.status(401).json({error: "-1", description: `Ruta /api/products DELETE no autorizada, solo administradores`})
        }
    }
    ,async (req, res) => {
        try {
            const { id } = req.params;
            const timestamp = Date.now();
            const { nombre, precio, thumbnail, descripcion, codigo, stock} = req.body;
            const boolean = await producto.updateById(id, nombre, precio, thumbnail, descripcion, codigo, timestamp, stock);
            if (boolean) {
                res.json({succes: true, description: "Producto modificado con exito"});
            } else{
                res.json({succes: false, description: "Producto no encontrado"});
            }  
        } catch (error) {
            console.log("error")
        }
});

//rutas carrito

routerCarrito.post('/', async (req, res)=>{
    const timestamp = new Date();
    const newCarrito = {timestamp: timestamp, productos: []};
    await carrito.save(newCarrito);
    const allCarts = await carrito.getAll();
    res.json({succes: true, msg: "Carrito creado con exito", cartID: allCarts.length})
})

routerCarrito.delete('/', async (req, res)=>{
    await carrito.deteleAll();
    res.json({succes: true, msg: "Se eliminaron todos los carritos"})
})

routerCarrito.get('/:id/productos', async (req, res)=>{
    try {
        const {id} = req.params;
        const allCarts = await carrito.getAll();
        const productsCart = allCarts.find((item) => item.id === id);
        res.json({cartID: id, productList: productsCart.productos})
    } catch (error) {
        res.json({error: true, msg: "Carrito no encontrado"});
    }
})

routerCarrito.post('/:id/productos/:id_prod' , async (req, res)=>{
        const {id, id_prod} = req.params;
        const productoPedido = await producto.getById(id_prod);
        if (productoPedido != null) {
            const allCarts = await carrito.getAll();
            const cartPedido = allCarts.find((item) => item.id === id);
            const newProductList = [...cartPedido.productos, productoPedido];
            carrito.updateCartById(id, cartPedido.timestamp, newProductList);
            res.json({succes: true, msg: "Producto añadido al carrito!"})
        } else {
            res.json({error: true, msg: "Producto no encontrado"})
        }
})

routerCarrito.delete('/:id/productos/:id_prod' , async (req, res)=>{
    const {id, id_prod} = req.params;
    const allCarts = await carrito.getAll();
    const cartPedido = allCarts.find((item) =>item.id === id);
    const newCarrito = cartPedido.productos.filter((item) => item.id !== id_prod);
    if (newCarrito.length === cartPedido.productos.length) {
        res.json({error: true, msg: "Producto no encontrado en el carrito"})
    }else{
        carrito.updateCartById(cartPedido.id, cartPedido.timestamp, newCarrito);
        res.json({succes: true, msg: "Producto eliminado con exito al carrito!"})
    }
})