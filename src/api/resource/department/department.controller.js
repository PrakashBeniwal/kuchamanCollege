const db = require("../../../../models");

const routes={
     create:(req,res)=>{
        const{name,about,image}=req.body;

        if (!name||!about) {
            res.status(400).json({mess:"please provide name and about"});
            return;
        }

        db.department.findOne({
            where:{name}
        })
        .then(department=>{
            if (department) {
                department.update({
                    name,about,image
                })
                .then(result=>{
                    if (result) {
                        res.status(200).json({mess:"successfully updated department"});
                        return;
                    }
                    res.status(400).json({mess:"cannot updated department"});
                    return;
                })
                .catch(err=>{
                    console.log(err)
                    res.status(400).json({err:"some error occure"})
                })
                return;
            }
            db.department.create({
                name,about,image
            })
            .then(result=>{
                if (result) {
                    res.status(200).json({mess:"successfully created department"});
                    return;
                }
                res.status(400).json({mess:"cannot created department"});
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
        db.department.findAll()
        .then(c=>{
            if (c.length>0) {
                res.status(200).json({list:c});
                return;
            }
            res.status(400).json({mess:"departments not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

    delete:(req,res)=>{
        const{id}=req.query

        if (!id) {
            res.status(400).json({mess:"please provide departmentId"});
            return;
        }

        db.department.findByPk(id)
        .then(c=>{
            if (!c) {
                res.status(400).json({mess:"department not exist"})
                return;
            }
            c.destroy()
            .then(success=>{
                if (success) {
                    res.status(200).json({mess:"successfully deleted department"})
                    return;
                }
                res.status(400).json({mess:"error in  deleting department"})
            }).catch(err=>{
                console.log(err)
                res.status(400).json({mess:"error occure in deleting department"})
            })
           
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

    getDepartmentById:(req,res)=>{
        const{id}=req.query
        if (!id) {
            res.status(400).json({mess:"please provide DepartmentId"});
            return;
        }

        db.department.findAll({where:{id}})
        .then(c=>{
            if (c) {
                res.status(200).json({list:c});
                return;
            }
            res.status(400).json({mess:"department not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },
    getDepartmentByName:(req,res)=>{
        const{name}=req.query
        if (!name) {
            res.status(400).json({mess:"please provide Department Name"});
            return;
        }

        db.department.findAll({where:{name}})
        .then(c=>{
            if (c) {
                res.status(200).json({list:c});
                return;
            }
            res.status(400).json({mess:"department not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

}

module.exports=routes;