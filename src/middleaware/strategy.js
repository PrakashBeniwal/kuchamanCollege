const passport = require("passport");

const localstrategy=(req,res,next)=> {
    passport.authenticate('local',{session:false},(err,user,info)=>{
        req.user=user
        next()
    })(req,res,next);
}

module.exports=localstrategy;