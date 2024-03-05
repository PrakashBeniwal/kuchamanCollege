const db = require("../../../../models");

const routes={
     create:(req,res)=>{
        const{name,post,number,image}=req.body;

        if (!name||!post||!image) {
            res.status(400).json({mess:"please provide name ,image and post "});
            return;
        }

        db.member.findOne({
            where:{name}
        })
        .then(member=>{
            if (member) {
                member.update({
                    name,post,image,number
                })
                .then(result=>{
                    if (result) {
                        res.status(200).json({mess:"successfully updated member"});
                        return;
                    }
                    res.status(400).json({mess:"cannot updated member"});
                    return;
                })
                .catch(err=>{
                    console.log(err)
                    res.status(400).json({err:"some error occure"})
                })
                return;
            }
            db.member.create({
                name,post,image,number
            })
            .then(result=>{
                if (result) {
                    res.status(200).json({mess:"successfully created member"});
                    return;
                }
                res.status(400).json({mess:"cannot created member"});
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
        db.member.findAll()
        .then(c=>{
            if (c.length>0) {
                res.status(200).json({list:c});
                return;
            }
            res.status(400).json({mess:"members not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

    delete:(req,res)=>{
        const{id}=req.query

        if (!id) {
            res.status(400).json({mess:"please provide memberId"});
            return;
        }

        db.member.findByPk(id)
        .then(c=>{
            if (!c) {
                res.status(400).json({mess:"member not exist"})
                return;
            }
            c.destroy()
            .then(success=>{
                if (success) {
                    res.status(200).json({mess:"successfully deleted member"})
                    return;
                }
                res.status(400).json({mess:"error in  deleting member"})
            }).catch(err=>{
                console.log(err)
                res.status(400).json({mess:"error occure in deleting member"})
            })
           
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

    getmemberById:(req,res)=>{
        const{id}=req.query
        if (!id) {
            res.status(400).json({mess:"please provide memberId"});
            return;
        }

        db.member.findAll({where:{id}})
        .then(c=>{
            if (c) {
                res.status(200).json({list:c});
                return;
            }
            res.status(400).json({mess:"member not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },
    getmemberByName:(req,res)=>{
        const{name}=req.query
        if (!name) {
            res.status(400).json({mess:"please provide member Name"});
            return;
        }

        db.member.findAll({where:{name}})
        .then(c=>{
            if (c) {
                res.status(200).json({list:c});
                return;
            }
            res.status(400).json({mess:"member not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

}

module.exports=routes;