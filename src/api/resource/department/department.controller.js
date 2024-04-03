const db = require("../../../../models");
const deleteS3Img = require("../../../aws/delImg.js");
// const delImg = require("../../../upload/delete");

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
        .then(async(department)=>{
            if (department) {

                if (image && department.image) {
                      await  deleteS3Img(department.image)
                }
                    department.update({
                        name,about,image:image?image:department.image
                        // name,about,image:req.file?.filename?req.file?.filename:department.image
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
                       return res.status(400).json({err:"some error occure"})
                    })
                
                return;
            }
            db.department.create({
                name,about,image:image?image:""
                // name,about,image:req.file.filename?req.file.filename:""
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
    //  create:(req,res)=>{
    //     const{name,about,image}=req.body;

    //     if (!name||!about) {
    //         res.status(400).json({mess:"please provide name and about"});
    //         return;
    //     }

    //     db.department.findOne({
    //         where:{name}
    //     })
    //     .then(department=>{
    //         if (department) {
    //             if (image) {
    //                 deleteS3Img(department.image)
    //             .then(success=>{
    //                 if (success) {
    //                     department.update({
    //                         name,about,image
    //                         // name,about,image:req.file?.filename?req.file?.filename:department.image
    //                     })
    //                     .then(result=>{
    //                         if (result) {
    //                             res.status(200).json({mess:"successfully updated department"});
    //                             return;
    //                         }
    //                         res.status(400).json({mess:"cannot updated department"});
    //                         return;
    //                     })
    //                     .catch(err=>{
    //                         console.log(err)
    //                         res.status(400).json({err:"some error occure"})
    //                     })
    //                     return;
    //                 }

    //             }).catch(err=>{
    //                 console.log(err)
    //                 res.status(400).json({mess:"error in deleting img"})
    //             })
    //             }else{
    //                 department.update({
    //                     name,about,image:department.image
    //                     // name,about,image:req.file?.filename?req.file?.filename:department.image
    //                 })
    //                 .then(result=>{
    //                     if (result) {
    //                         res.status(200).json({mess:"successfully updated department"});
    //                         return;
    //                     }
    //                     res.status(400).json({mess:"cannot updated department"});
    //                     return;
    //                 })
    //                 .catch(err=>{
    //                     console.log(err)
    //                    return res.status(400).json({err:"some error occure"})
    //                 })
    //             }
    //             return;
    //         }
    //         db.department.create({
    //             name,about,image:image?image:""
    //             // name,about,image:req.file.filename?req.file.filename:""
    //         })
    //         .then(result=>{
    //             if (result) {
    //                 res.status(200).json({mess:"successfully created department"});
    //                 return;
    //             }
    //             res.status(400).json({mess:"cannot created department"});
    //             return;
    //         })
    //         .catch(err=>{
    //             console.log(err)
    //             res.status(400).json({err:"some error occure"})
    //         })
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //         res.status(400).json({err:"some error occure"})
    //     })

    // },

    list:(req,res)=>{
        db.department.findAll()
        .then(c=>{
            if (c.length>0) {
                res.status(200).json({list:c});
                return;
            }
            res.status(200).json({list:[]})
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
                    if (success) {
                        if (success.image) {
                            // delImg(success.image)
                            deleteS3Img(success.image)
                        .then(result=>{
                            if (result) {
                               return res.status(200).json({mess:"successfully deleted department"})
                                
                            }else{
                                res.status(400).json({mess:"error in deleting department image"});
                                return;
                            }
                        
                        }).catch(err=>{
                            console.log(err);
                            return;
                        })
                        return;
                        }
                        res.status(200).json({mess:"successfully deleted department"})
                       return;
                    }
                    return;
                }
                res.status(400).json({mess:"error in  deleting department"})
                return
            }).catch(err=>{
                console.log(err)
                res.status(400).json({mess:"error occure in deleting department"})
                return;
            })
           
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({mess:"some error occure at server"});
            return
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