const express=require('express');
const auth = require('./resource/auth');
// const product = require('./resource/product');
const category = require('./resource/category');
const product = require('./resource/product');
const department = require('./resource/department');
// const category = require('./resource/category');



const restrouter=express.Router();

restrouter.use('/auth',auth)
restrouter.use('/product',product)
restrouter.use('/category',category)
restrouter.use('/department',department)

module.exports=restrouter;