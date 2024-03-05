const express=require('express');
const routes = require('./syllabus.controller');


const router=express.Router();

router.route("/create").post(routes.create);
router.route("/list").get(routes.list);
router.route("/getSyllabusById").get(routes.getSyllabusById);
router.route("/delete").delete(routes.delete);

module.exports=router;