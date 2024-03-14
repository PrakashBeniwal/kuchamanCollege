const express=require('express');
const routes = require('./department.controller');
const  upload  = require('../../../upload');


const router=express.Router();

router.route("/create").post(upload.single("photo"),routes.create);
router.route("/list").get(routes.list);
router.route("/delete").delete(routes.delete);
router.route("/getDepartmentById").get(routes.getDepartmentById);
router.route("/getDepartmentByName").get(routes.getDepartmentByName);

module.exports=router;