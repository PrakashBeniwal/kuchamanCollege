const express=require('express');
const routes = require('./course.controller');


const router=express.Router();

router.route("/create").post(routes.create);
router.route("/list").get(routes.list);
router.route("/getCourseById").get(routes.getCourseById);
router.route("/getForAddSyllabus").get(routes.getForAddSyllabus);
router.route("/getCourseId").get(routes.getCourseId);
router.route("/delete").delete(routes.delete);

module.exports=router;