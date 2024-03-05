const db = require("../../../../models");

const routes={
     create:(req,res)=>{
        const{university,name,about,phone,email,city,district,state,collegeLogo,universityLogo,photo,simityPhoto}=req.body;
        if (!name||!university||!phone) {
            res.status(400).json({mess:"please provide collegeName and universityName"});
            console.log({university,name,about,phone,email,city,district,state})
            return;
        }

        db.college.findOne({
            where:{id:"1"}
        })
        .then(college=>{
            if (college) {
                db.college.update({
                    university,name,about,phone,email,city,district,state,collegeLogo,universityLogo,photo,simityPhoto
                },{where:{id:1}})
                .then(result=>{
                    if (result) {
                        res.status(200).json({mess:"successfully updated college"});
                        return;
                    }
                    res.status(400).json({mess:"cannot updated college"});
                    return;
                })
                .catch(err=>{
                    console.log(err)
                    res.status(400).json({err:"some error occure"})
                })
                return;
            }
            db.college.create({
                university,name,about,phone,email,city,district,state:rajya
            })
            .then(result=>{
                if (result) {
                    res.status(200).json({mess:"successfully created college"});
                    return;
                }
                res.status(400).json({mess:"cannot created college"});
                return;
            })
            .catch(err=>{
                console.log(err)
                res.status(400).json({err:"some error occure"})
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({err:"some error occure"})
        })

    },

    list:(req,res)=>{
        db.college.findOne()
        .then(c=>{
            if (c) {
                res.status(200).json({list:c});
                return;
            }
            res.status(400).json({mess:"colleges not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

    delete:(req,res)=>{
        const{id}=req.query

        if (!id) {
            res.status(400).json({mess:"please provide collegeId"});
            return;
        }

        db.college.findByPk(id)
        .then(c=>{
            if (!c) {
                res.status(400).json({mess:"college not exist"})
                return;
            }
            c.destroy()
            .then(success=>{
                if (success) {
                    res.status(200).json({mess:"successfully deleted college"})
                    return;
                }
                res.status(400).json({mess:"error in  deleting college"})
            }).catch(err=>{
                console.log(err)
                res.status(400).json({mess:"error occure in deleting college"})
            })
           
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

    getcollegeById:(req,res)=>{
        const{id}=req.query
        if (!id) {
            res.status(400).json({mess:"please provide collegeId"});
            return;
        }

        db.college.findAll({where:{id}})
        .then(c=>{
            if (c) {
                res.status(200).json({list:c});
                return;
            }
            res.status(400).json({mess:"college not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },


}

module.exports=routes;