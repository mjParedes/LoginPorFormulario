import { Router } from "express";
import { productsModel } from "../dao/models/products.model.js";

const router = Router()


router.get('/products', async (req, res) => {
    const products = await productsModel.find()
    res.render('products', products)
})

router.get('/registro',(req,res)=>{
    res.render('registro')
})

router.get('/errorRegistro',(req,res)=>{
    res.render('errorRegistro')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/perfil',(req,res)=>{
    res.render('perfil',{email:req.session.email})
})

router.get('/errorLogin',(req,res)=>{
    res.render('errorLogin')
})




export default router

