const express=require('express');
const routes = require('./controller');


const router=express.Router();

router.route("/create").post(routes.create);
router.route("/list").get(routes.list);
router.route("/delete").delete(routes.delete);
router.route("/getById").get(routes.getmemberById);
router.route("/getByName").get(routes.getmemberByName);

module.exports=router;