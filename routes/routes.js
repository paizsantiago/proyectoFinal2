const Usuarios = require("../models/usuario");
const {resultado} = require("../src/daos/index")
const producto = new resultado.producto();
const carrito = new resultado.carrito();


const getHome = (req, res) =>{
    const {nombre} = req.user
    const user = {username: nombre}
    res.render("home.pug", {user})
}

const getLogin = (req, res) =>{
    if(req.isAuthenticated()){
       res.redirect("/")
    } else {
     res.render('login.pug')
    }
 }


const getProductos = async (req, res) =>{
        const productos = await producto.getAll();
        if (productos === "[]")  {
            res.render("productos.pug" ,{productsExist: false})
        } else {
            res.render("productos.pug" ,{productsExist: true, products: productos})
        }
    }    
    
const  getProductoId = async (req, res) =>{
        const {id} = req.params;
        const productosArray = await producto.getAll();
        const productoPedido = await producto.getById(id);
        if (productosArray.length < id) {
            res.json({error: "true", msg: "El producto no existe"})
        } else {
            res.json(productoPedido);
        }
    }

const getRegister = (req, res)=>{
    if (req.isAuthenticated()) {
        res.redirect("/")
      } else {
        res.render('register.pug');
      }
}

const postLogout = (req, res)=>{
    req.session.destroy((error) =>{
        if (error) {
            res.send("no pudo desloguear")
        } else {
            res.redirect("/login")
        }
    })
}

const getInfoUser = async (req, res) =>{
    const {nombre, email, password, direccion, edad, telefono, avatar} = req.user;
    const infoUser = {nombre, email, password, direccion, edad, telefono, avatar}
    res.render("infoUser.pug" , {infoUser})
}

const getCarrito = async (req, res)=>{
        const username = req.user.email;
        const user = await Usuarios.find({email: username});
        const idCart = user[0].carrito._id;
        const carritoUsuario = await carrito.getById(idCart);
        const productsCart = carritoUsuario.productos;
        productsCart.length > 0 ? productsExist = true : productsExist = false;
        res.render("carrito.pug", {productsExist: productsExist, products: productsCart})
}

const postProductCart = async (req, res)=>{
    const {id} = req.params;
    const username = req.user.email;
    const user = await Usuarios.find({email: username});
    const carritoUserID = user[0].carrito._id; 
    const carritoUserTimestamp = user[0].carrito.timestamp; 
    const carritoDB = await carrito.getById(carritoUserID);
    let newProductos = carritoDB.productos;
    const productoPedido = await producto.getById(id);
    newProductos = [...newProductos, productoPedido];
    await carrito.updateCartById(carritoUserID, carritoUserTimestamp, newProductos);
    res.redirect('/api/productos');
}

const postActualizarCarrito = async (req, res)=>{
    const {id} = req.params;
    const username = req.user.email;
    const user = await Usuarios.find({email: username});
    const carritoUserID = user[0].carrito._id; 
    const carritoUserTimestamp = user[0].carrito.timestamp; 
    const carritoDB = await carrito.getById(carritoUserID);
    let carritoActualizado;
    let newProductos = carritoDB.productos;
    newProductos.length === 1 ? carritoActualizado = [] : carritoActualizado = newProductos.find((item) => item._id !== id);
    await carrito.updateCartById(carritoUserID, carritoUserTimestamp, carritoActualizado);
    res.redirect('/api/carrito');
}

module.exports ={
    getHome,
    getProductos,
    getProductoId,
    getRegister,
    postLogout,
    getLogin,
    getInfoUser,
    getCarrito,
    postProductCart,
    postActualizarCarrito
}
