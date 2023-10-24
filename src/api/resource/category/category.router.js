const express=require('express');
const auth = require('./category.controller');


const router=express.Router();

router.route("/find").get(auth.find);

module.exports=router;