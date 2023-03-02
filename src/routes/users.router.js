import { Router } from "express";
import { productsModel } from "../dao/models/products.model.js";
import { usersModel } from '../dao/models/users.model.js'



const router = Router()

router.get('/products', async (req, res) => {
    const products = await productsModel.find()
    res.render('products', products)
})

//? Mongo
router.post('/registro', async (req, res) => {
    const { email, password } = req.body
    const existeUsuario = await usersModel.findOne({ email })
    console.log(existeUsuario)
    if (!existeUsuario) {
        const data = await usersModel.create(req.body)
        console.log(data)
        res.redirect('/views/login')
    } else {
        res.redirect('/views/errorRegistro')
    }
})

router.post('/login', async (req, res) => {
    // req.session = {};
    const { email, password } = req.body
    const usuario = await usersModel.findOne({ email })
    if (!email || !password) {
        res.redirect('/views/errorLogin')
    }
    if (usuario && usuario.email === email && usuario.password === password) {
        req.session.email = email
        req.session.admin = true
        req.session.logged = true

        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.session.isAdmin = true
        } else {
            req.session.isAdmin = false
            req.session.role = "usuario"

        }
        res.redirect('/views/products')
    }
    else {
        res.send('Email o contraseña invalido')
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) console.log(error)
        else res.redirect('/views/login')
    })
})

export default router