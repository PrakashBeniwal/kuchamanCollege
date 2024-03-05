const express=require('express');
const routes = require('./department.controller');


const router=express.Router();

router.route("/create").post(routes.create);
router.route("/list").get(routes.list);
router.route("/delete").delete(routes.delete);
router.route("/getDepartmentById").get(routes.getDepartmentById);
router.route("/getDepartmentByName").get(routes.getDepartmentByName);

module.exports=router;