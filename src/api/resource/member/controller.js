const db = require("../../../../models");
const deleteS3Img = require("../../../aws/delImg");
const delImg = require("../../../upload/delete");

const routes = {
    create: (req, res) => {
        const { name, post, number, image } = req.body;

        if (!name || !post) {
            res.status(400).json({ mess: "please provide name  and post " });
            return;
        }

        db.member.findOne({
            where: { name }
        })
            .then(async(member) => {
                if (member) {
                    if (image && member.image) {
                        await  deleteS3Img(member.image)
                  }
                        member.update({
                            name, post, image: image?image:member.image, number
                            // name,post,image:req.file?.filename?req.file?.filename:member.image,number
                        })
                            .then(result => {
                                if (result) {
                                    res.status(200).json({ mess: "successfully updated member" });
                                    return;
                                }
                                res.status(400).json({ mess: "cannot updated member" });
                                return;
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(400).json({ err: "some error occure" })
                            })
                    
                    return;
                }
                db.member.create({
                    name, post, image, number
                })
                    .then(result => {
                        if (result) {
                            res.status(200).json({ mess: "successfully created member" });
                            return;
                        }
                        res.status(400).json({ mess: "cannot created member" });
                        return;
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400).json({ err: "some error occure" })
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({ err: "some error occure" })
            })

    },

    list: (req, res) => {
        db.member.findAll()
            .then(c => {
                if (c.length > 0) {
                    res.status(200).json({ list: c });
                    return;
                }
                res.status(200).json({list:[], mess: "members not available" })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({ mess: "some error occure at server" })
            })
    },

    delete: (req, res) => {
        const { id } = req.query

        if (!id) {
            res.status(400).json({ mess: "please provide memberId" });
            return;
        }

        db.member.findByPk(id)
            .then(c => {
                if (!c) {
                    res.status(400).json({ mess: "member not exist" })
                    return;
                }
                c.destroy()
                    .then(success => {
                        if (success) {
                            if (success.image) {
                                deleteS3Img(success.image)
                                    .then(result => {
                                        if (result) {
                                            return res.status(200).json({ mess: "successfully deleted member" })

                                        } else {
                                            res.status(400).json({ mess: "error in deleting member image" });
                                            return;
                                        }

                                    }).catch(err => {
                                        console.log(err);
                                        return;
                                    })
                                return;
                            }
                            res.status(200).json({ mess: "successfully deleted member" })
                            return;
                        }
                        res.status(400).json({ mess: "error in  deleting member" })
                    }).catch(err => {
                        console.log(err)
                        res.status(400).json({ mess: "error occure in deleting member" })
                    })

            })
            .catch(err => {
                console.log(err)
                res.status(400).json({ mess: "some error occure at server" })
            })
    },

    getmemberById: (req, res) => {
        const { id } = req.query
        if (!id) {
            res.status(400).json({ mess: "please provide memberId" });
            return;
        }

        db.member.findAll({ where: { id } })
            .then(c => {
                if (c) {
                    res.status(200).json({ list: c });
                    return;
                }
                res.status(400).json({ mess: "member not available" })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({ mess: "some error occure at server" })
            })
    },
    getmemberByName: (req, res) => {
        const { name } = req.query
        if (!name) {
            res.status(400).json({ mess: "please provide member Name" });
            return;
        }

        db.member.findAll({ where: { name } })
            .then(c => {
                if (c) {
                    res.status(200).json({ list: c });
                    return;
                }
                res.status(400).json({ mess: "member not available" })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({ mess: "some error occure at server" })
            })
    },

}

module.exports = routes;