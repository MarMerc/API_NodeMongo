const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
require ('dotenv').config()

const app= express();
const URL_CONNECT = process.env.URL_CONNECT;
const PORT = process.env.PORT;
app.use(express.json());


app.listen(PORT, ()=>{
    console.log('Server node');
});

//TEST
app.get('/', (req,res)=>{
    res.send('Get from Home')
});

//GET: RECUPERAR TODOS LOS PRODUCTOS
app.get('/products', async (req,res)=>{
    try {
        const products= await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({messaje: error.messaje})
    }
});

//GET: RECUPERAR UN PRODUCTO POR SU ID
app.get('/product/:id', async (req,res)=>{
    try {
        const {id}= req.params;
        const product= await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({messaje: error.messaje})
    }
});

//POST
app.post('/product', async (req,res)=>{
    try {
        const product= await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({messaje: error.messaje})
    }
});

//DELETE PRODUCTO POR ID
app.delete('/product/:id', async (req,res)=>{
    try {
        const {id}= req.params;
        const product= await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({messaje:`El id: ${id} no fue encontrado.`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({messaje: error.messaje})
    }
});

//PUT PARA ACTUALIZAR UN PRODUCTO
app.put('/product/:id', async (req,res)=>{
    try {
        const {id}= req.params;
        const product= await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({messaje:`El id: ${id} no fue encontrado.`})
        }
        const productUpdated = await Product.findById(id);
        res.status(200).json(productUpdated);
    } catch (error) {
        res.status(500).json({messaje: error.messaje})
    }
});

mongoose.connect(URL_CONNECT)
    .then(()=>{
        console.log('connect whit mongo');
    });

//PUT//DELETE