const { putobject, geturl } = require("../../../aws");
const deleteS3Img = require("../../../aws/delImg");

const routes = {
    uploadImg: async (req, res) => {
        const { key } = req.query;
        const data = await putobject('jpeg', key ? key : undefined);
        res.status(200).json({ data });
    },

    upload: (req, res) => {
        const {key, prevKey,type } = req.body;

        putobject(type, key ? key : null)
            .then(result => {
                if (result) {
                    if (prevKey) {
                        deleteS3Img(prevKey)
                        .then(success => {
                            if (success) {
                             res.status(200).json({ data:result });
                             return
                            }
                        }).catch(err => {
                            console.log(err)
                        })  
                        return
                    }
                    return res.status(200).json({ data:result });
                }
            }).catch(err => {
                console.log(err)
            })


    },

    getImg: async (req, res) => {
        const { key } = req.query;
        geturl(key).then(url => {
            if (url) {
                res.status(200).json(url);
                return;
            }
        }).catch(err => {
            console.log(err)
            res.status(400).json({ mess: err })
        })
    },

}

module.exports = routes;