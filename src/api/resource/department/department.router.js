const express=require('express');
const auth = require('./department.controller');


const router=express.Router();

router.route("/find").get(auth.find);
router.route("/create").get(auth.create);
router.route("/count").get(auth.count);
router.route("/update").get(auth.update);

module.exports=router;