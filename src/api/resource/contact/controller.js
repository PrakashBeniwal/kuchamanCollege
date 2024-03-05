const db = require("../../../../models");

const routes={
     create:(req,res)=>{
        const{relatedWork,email,number}=req.body;

        if (!relatedWork) {
            res.status(400).json({mess:"please provide name and about"});
            return;
        }

        db.contact.findOne({
            where:{relatedWork}
        })
        .then(contact=>{
            if (contact) {
                contact.update({
                    relatedWork,email,number
                })
                .then(result=>{
                    if (result) {
                        res.status(200).json({mess:"successfully updated contact"});
                        return;
                    }
                    res.status(400).json({mess:"cannot updated contact"});
                    return;
                })
                .catch(err=>{
                    console.log(err)
                    res.status(400).json({err:"some error occure"})
                })
                return;
            }
            db.contact.create({
                relatedWork,email,number
            })
            .then(result=>{
                if (result) {
                    res.status(200).json({mess:"successfully created contact"});
                    return;
                }
                res.status(400).json({mess:"cannot created contact"});
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
        db.contact.findAll()
        .then(c=>{
            if (c.length>0) {
                res.status(200).json({list:c});
                return;
            }
            res.status(400).json({mess:"contacts not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

    delete:(req,res)=>{
        const{id}=req.query

        if (!id) {
            res.status(400).json({mess:"please provide contactId"});
            return;
        }

        db.contact.findByPk(id)
        .then(c=>{
            if (!c) {
                res.status(400).json({mess:"contact not exist"})
                return;
            }
            c.destroy()
            .then(success=>{
                if (success) {
                    res.status(200).json({mess:"successfully deleted contact"})
                    return;
                }
                res.status(400).json({mess:"error in  deleting contact"})
            }).catch(err=>{
                console.log(err)
                res.status(400).json({mess:"error occure in deleting contact"})
            })
           
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

    getcontactById:(req,res)=>{
        const{id}=req.query
        if (!id) {
            res.status(400).json({mess:"please provide contactId"});
            return;
        }

        db.contact.findAll({where:{id}})
        .then(c=>{
            if (c) {
                res.status(200).json({list:c});
                return;
            }
            res.status(400).json({mess:"contact not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },


}

module.exports=routes;