const express=require('express');
const auth = require('./auth.controller');
const localstrategy = require('../../../middleaware/strategy');
const { validate, schema } = require('../../../middleaware/validator');


const router=express.Router();

router.route("/find").get(auth.find);
router.route("/create").post(validate(schema.create),auth.create);
router.route("/count").get(auth.count);
router.route("/update").get(auth.update);
// router.route("/login").post(auth.login);
// router.route("/login").post(
//     passport.authenticate('local',{session:false},(err,user,info)=>{
        
//         console.log({user,err})
    
//     })
// ,auth.login);
router.route("/login").post(localstrategy, auth.login);


module.exports=router;