import { Router } from "express";
import { productsModel } from "../dao/models/products.model.js";
import { auth, isLogged } from "../middlewares/auth.middlewares.js";


const router = Router()


router.get('/products',auth ,async (req, res) => {
    const products = await productsModel.find()
    res.render('products',  {email:req.session.email})
})

router.get('/registro',isLogged,(req,res)=>{
    res.render('registro')
})

router.get('/errorRegistro',(req,res)=>{
    res.render('errorRegistro')
})

router.get('/login',isLogged,(req,res)=>{
    res.render('login')
})

router.get('/perfil',(req,res)=>{
    res.render('perfil',{email:req.session.email})
})

router.get('/errorLogin',(req,res)=>{
    res.render('errorLogin')
})




export default router

