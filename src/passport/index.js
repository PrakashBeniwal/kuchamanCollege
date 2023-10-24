const passport = require("passport");
const db = require("../../models");
const Localstrategy=require('passport-local').Strategy


passport.use(new Localstrategy({usernameField:"email"},(email, password, done)=> {
    

    db.User.findOne({where:{firstName:email}})
    .then(user=>{
        done(false,user)
    })
    }
  ));
