const express=require('express');
const course = require('./resource/course');
const department = require('./resource/department');
const syllabus = require('./resource/syllabus');
const contact = require('./resource/contact');
const college = require('./resource/college');
const member = require('./resource/member');



const restrouter=express.Router();

restrouter.use('/course',course)
restrouter.use('/department',department)
restrouter.use('/syllabus',syllabus)
restrouter.use('/contact',contact)
restrouter.use('/college',college)
restrouter.use('/member',member)


module.exports=restrouter;