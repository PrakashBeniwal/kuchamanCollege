const db = require("../../../../models");
const deleteS3Img = require("../../../aws/delImg");

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
        .then(async(college)=>{
            if (college) {
                // if (collegeLogo) {
                //     await deleteS3Img(college.collegeLogo)
                // }
                // if (universityLogo) {
                //     await deleteS3Img(college.universityLogo)
                // }
                // if (photo) {
                //     await deleteS3Img(college.photo)
                // }
                // if (simityPhoto) {
                //     await deleteS3Img(college.simityPhoto)
                // }

                db.college.update({
                    university,name,about,phone,email,city,district,state,collegeLogo:collegeLogo||college.collegeLogo,universityLogo:universityLogo||college.universityLogo,photo:photo||college.photo,simityPhoto:simityPhoto||college.simityPhoto
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
                university,name,about,phone,email,city,district,state,collegeLogo,universityLogo,simityPhoto,photo
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
    //  create:(req,res)=>{
    //     const{university,name,about,phone,email,city,district,state}=req.body;
    //     if (!name||!university||!phone) {
    //         res.status(400).json({mess:"please provide collegeName and universityName"});
    //         console.log({university,name,about,phone,email,city,district,state})
    //         return;
    //     }

    //     const collegeLogo=req.files["collegeLogo"]?req.files["collegeLogo"][0].filename:null;
    //     const universityLogo=req.files["universityLogo"]?req.files["universityLogo"][0].filename:null;
    //     const photo=req.files["photo"]?req.files["photo"][0].filename:null;
    //     const simityPhoto=req.files["simityPhoto"]?req.files["simityPhoto"][0].filename:null;



    //     db.college.findOne({
    //         where:{id:"1"}
    //     })
    //     .then(async(college)=>{
    //         if (college) {
    //             if (collegeLogo) {
    //                 await delImg(college.collegeLogo)
    //             }
    //             if (universityLogo) {
    //                 await delImg(college.universityLogo)
    //             }
    //             if (photo) {
    //                 await delImg(college.photo)
    //             }
    //             if (simityPhoto) {
    //                 await delImg(college.simityPhoto)
    //             }

    //             db.college.update({
    //                 university,name,about,phone,email,city,district,state,collegeLogo:collegeLogo||college.collegeLogo,universityLogo:universityLogo||college.universityLogo,photo:photo||college.photo,simityPhoto:simityPhoto||college.simityPhoto
    //             },{where:{id:1}})
    //             .then(result=>{
                    
    //                 if (result) {
    //                     res.status(200).json({mess:"successfully updated college"});
    //                     return;
    //                 }
    //                 res.status(400).json({mess:"cannot updated college"});
    //                 return;
    //             })
    //             .catch(err=>{
    //                 console.log(err)
    //                 res.status(400).json({err:"some error occure"})
    //             })
    //             return;
    //         }
    //         db.college.create({
    //             university,name,about,phone,email,city,district,state
    //         })
    //         .then(result=>{
    //             if (result) {
    //                 res.status(200).json({mess:"successfully created college"});
    //                 return;
    //             }
    //             res.status(400).json({mess:"cannot created college"});
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