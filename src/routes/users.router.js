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
    const {email, password} = req.body
    const existeUsuario = await usersModel.find({email,password})
    console.log(existeUsuario)
    if(existeUsuario.lenght !== 0){
        res.redirect('/views/errorRegistro')
    } else{
        await usersModel.create(req.body)
        res.redirect('/views/login')
    }
})

router.post('/login',async(req, res)=>{
    const {email,password} = req.body
    const usuario= await usersModel.find({email,password})
    if(usuario.length !== 0){
        for(const key in req.body){
            req.session[key]= req.body[key]
        }
        res.redirect('/views/products')
        // perfil
    } else{
        res.redirect('/views/errorLogin')
    }
})

router.get('/logout',(req, res)=>{
    req.session.destroy((error)=>{
        if(error)console.log(error)
        else res.redirect('/views/login')
    })
}) 

export default router