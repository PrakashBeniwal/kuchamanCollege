const express=require('express');
const routes = require('./controller');
const upload = require('../../../upload');


const router=express.Router();

router.route("/create").post(routes.create);
router.route("/list").get(routes.list);
router.route("/delete").delete(routes.delete);
router.route("/getById").get(routes.getcollegeById);

module.exports=router;