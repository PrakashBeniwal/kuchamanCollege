'use strict';
const app=require('./src/index');
const Serverless=require('serverless-http')
module.exports.hello =Serverless(app);

