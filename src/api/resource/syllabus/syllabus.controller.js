const db = require("../../../../models");

const routes={
     create:(req,res)=>{
        const{courseId,semesterI,semesterII,semesterIII,semesterIV,semesterV,semesterVI,semesterVII,semesterVIII}=req.body;

        if (!courseId || !semesterI) {
            res.status(400).json({mess:"please provide courseId"});
            return;
        }

        db.syllabus.findOne({
            where:{courseId}
        })
        .then(course=>{
            if (course) {
                res.status(400).json({mess:"Syllabus already Exist"});
                return;
            }
            db.syllabus.create({
                courseId,semesterI,semesterII,semesterIII,semesterIV,semesterV,semesterVI,semesterVII,semesterVIII
            })
            .then(result=>{
                if (result) {
                    res.status(200).json({mess:"successfully created syllabus"});
                    return;
                }
                res.status(400).json({mess:"cannot created syllabus"});
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
        let list=[];
        db.course.findAll({
            order:[['updatedAt',"DESC"]],
            include:{model:db.syllabus,required:true},
            attributes:['name','type','duration','level',"id"]
        })
        .then((c)=>{
            if (c.length>0) {

                list = c.reduce((acc, course) => {
                    if (course.type === 'Semester') {
                      acc[0].push(course);
                    } else if (course.type === 'Annual') {
                      acc[1].push(course);
                    }
                    return acc;
                  }, [[], []]);

                res.status(200).json({list: list,data:c});
                return;
            }
            res.status(400).json({mess:"syllabus not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

    getSyllabusById:(req,res)=>{
        const{id}=req.query
        
        if (!id) {
            res.status(400).json({mess:"please provide syllabus"});
            return;
        }

        db.course.findAll({where:{id}, include:{model:db.syllabus},
            attributes:['name','type','duration','level']})
        .then(c=>{
            if (c.length>0) {
                res.status(200).json({list:c});
                return;
            }
            res.status(400).json({mess:"syllabus not available"})
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

    delete:(req,res)=>{
        const{id}=req.query

        if (!id) {
            res.status(400).json({mess:"please provide syllabusId"});
            return;
        }

        db.course.findByPk(id)
        .then(c=>{
            if (!c) {
                res.status(400).json({mess:"syllabus not exist"})
                return;
            }
            c.destroy()
            .then(success=>{
                if (success) {
                    res.status(200).json({mess:"successfully deleted syllabus"})
                    return;
                }
                res.status(400).json({mess:"error in  deleting syllabus"})
            }).catch(err=>{
                console.log(err)
                res.status(400).json({mess:"error occure in deleting syllabus"})
            })
           
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"})
        })
    },

}

module.exports=routes;