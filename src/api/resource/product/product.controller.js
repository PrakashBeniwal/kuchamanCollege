const db = require("../../../../models");

const route={
     find:(req,res)=>{
        db.User.findAll({
            include:{model:db.Student}
        }).
        then(data=>
            res.json(data)
            )
    },
     create:(req,res)=>{
        db.User.create({
            firstName:"2",
            lastName:"beniwal",
            email:"ankur@gmail.com"
        }).
        then(data=>
            res.json(data)
            )
    },

}

module.exports=route;