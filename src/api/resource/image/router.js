const express=require('express');
const routes = require('./controller');

const router=express.Router();

router.route("/getImg").post(routes.getImg);
router.route("/uploadImg").get(routes.uploadImg);
router.route("/upload").post(routes.upload);

module.exports=router;