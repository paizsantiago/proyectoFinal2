const {resultado} = require("../src/daos/index")
const producto = new resultado.producto();
const carrito = new resultado.carrito();
const Usuarios = require("../models/usuario")

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
    
const  getHomeId = async (req, res) =>{
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

const postRegister = (req, res)=>{
    // console.log(req.body);
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

module.exports ={
    getHome,
    getProductos,
    getHomeId,
    getRegister,
    postRegister,
    postLogout,
    getLogin,
    getInfoUser,
}
