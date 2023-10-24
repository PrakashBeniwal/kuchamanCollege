const express=require('express');
const route = require('./product.controller');


const router=express.Router();

router.route("/find").get(route.find);
router.route("/create").get(route.create);

module.exports=router;