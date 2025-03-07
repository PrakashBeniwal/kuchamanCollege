const express=require("express");
require("dotenv/config");
const restrouter = require("./api");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors=require('cors')
const app=express();
require('./passport')
// const PORT=process.env.SERVER_PORT||4000;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({limit:'50mb'}))
app.use(express.json())
app.use(cors())
app.use(
    session({
      secret: "config.app.secret",
      resave: true,
      saveUninitialized: true,
    })
  );
app.use(passport.initialize());
app.use(passport.session());

app.use('/api',restrouter)

app.use(express.static(`${__dirname}/college`));
app.use(express.static(`${__dirname}/admin`));

app.use('/public',express.static(`${__dirname}/upload/photos`));

app.get('/c',(req,res)=>{
    // res.sendFile(`${__dirname}/college/index.html`)
    res.send("hello")
})
// app.get('/c/*',(req,res)=>{
//     res.sendFile(`${__dirname}/college/index.html`)
// })

// app.get('/admin',(req,res)=>{
//     res.sendFile(`${__dirname}/admin/index.html`)
//     // res.json("hello")
// })

// app.get('/admin/*',(req,res)=>{
//     res.sendFile(`${__dirname}/admin/index.html`)
//     // res.json("hello")
// })

// app.listen(PORT,()=>{
//     console.log(`port is running on port ${PORT}`)
// })

module.exports= app;

