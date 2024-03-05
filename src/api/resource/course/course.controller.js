const db = require("../../../../models");

const routes={
     create:(req,res)=>{
        const{level,name,duration,type,admissionProcess,modeOfAdmission,medium,regFee,fee,boysFund,totalFee,DepartmentId}=req.body;

        if (!name,!fee,!totalFee,!DepartmentId,!boysFund) {
            res.status(400).json({mess:"please provide name,fee,totalFee,boysFund,DepartmentId"});
            return;
        }

        db.course.findOne({
            where:{name}
        })
        .then(course=>{
            if (course) {
                res.status(400).json({mess:"course already Exist"});
                return;
            }
            db.course.create({
                level,name,duration,type,admissionProcess,modeOfAdmission,medium,regFee,fee,boysFund,totalFee,DepartmentId
            })
            .then(result=>{
                if (result) {
                    res.status(200).json({mess:"successfully created course"});
                    return;
                }
                res.status(400).json({mess:"cannot created course"});
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
        db.course.findAll({order:[['updatedAt',"DESC"]]})
        .then(c=>{
            if (c.length>0) {
                res.status(200).json({list:c});
                return;
            }
            res.status(400).json({mess:"courses not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

    getCourseId:(req,res)=>{
        db.course.findAll({order:[['updatedAt',"DESC"]],attributes:['id','name']})
        .then(c=>{
            if (c.length>0) {
                res.status(200).json({list:c});
                return;
            }
            res.status(400).json({mess:"courses not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

    getForAddSyllabus:(req,res)=>{
        const{id}=req.query
        
        if (!id) {
            res.status(400).json({mess:"please provide courseId"});
            return;
        }

        db.course.findAll({where:{id},attributes:['type','duration',"id"]})
        .then(c=>{
            if (c) {
                res.status(200).json({list:c});
                return;
            }
            res.status(400).json({mess:"course not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

    getCourseById:(req,res)=>{
        const{id}=req.query
        
        if (!id) {
            res.status(400).json({mess:"please provide courseId"});
            return;
        }

        db.course.findAll({where:{id}})
        .then(c=>{
            if (c) {
                res.status(200).json({list:c});
                return;
            }
            res.status(400).json({mess:"course not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

    delete:(req,res)=>{
        const{id}=req.query

        if (!id) {
            res.status(400).json({mess:"please provide courseId"});
            return;
        }

        db.course.findByPk(id)
        .then(c=>{
            if (!c) {
                res.status(400).json({mess:"course not exist"})
                return;
            }
            c.destroy()
            .then(success=>{
                if (success) {
                    res.status(200).json({mess:"successfully deleted course"})
                    return;
                }
                res.status(400).json({mess:"error in  deleting course"})
            }).catch(err=>{
                console.log(err)
                res.status(400).json({mess:"error occure in deleting course"})
            })
           
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

}

module.exports=routes;