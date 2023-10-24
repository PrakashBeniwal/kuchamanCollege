const { Op } = require("sequelize");
const db = require("../../../../models");

const auth={
    //  find:(req,res)=>{
    //     db.Student.findAll({
    //         include:{model:db.User,required:true},
    //         // limit:1,
    //         // offset:1,
    //         where:{name:{[Op.like]:"%ra%"}}
    //     })
    //     .then(data=>{
    //         res.send(data)
    //     })
    // },
     find:async(req,res)=>{

       let query={};
        // query.where={name:{[Op.like]:"%pr%"}};
        // query.include={model:db.Student};

        // db.department.findAll(query)
        // .then(data=>{
        //     res.send(data)
        // }).catch(err=>{
        //     console.log({err});
        //     // res.status(400).send({message:"error ocurred",err})
        //     throw new RequestError("Error");
        // })

        let dep=await db.department.findAll();

        res.send(dep)
    },

    create:(req,res)=>{
        db.department.create({
            name:'ankur',
            year:"9th",
            DNO:124
        })
        .then(data=>{
            res.send(data)
        })
    },
    count:(req,res)=>{
        db.Student.count({
            include:{model:db.User,where:{id:{[Op.not]:'NULL'}}},
            where:{name:"ankur"}
        })
        .then(count=>{
           return db.Student.findAll({
                include:{model:db.User,where:{id:{[Op.not]:'NULL'}}},
            where:{name:"ankur"}

            }).then(data=>{
            return [count,data]
            })
        })
        .then((result)=>{
            res.json(result)
        })
    },
    update:(req,res)=>{
        db.User.update({
            firstName:"3"
        },{where:{firstName:"2"}})
        .then(data=>{
           return res.send(data)
        })
    },

}

module.exports=auth;