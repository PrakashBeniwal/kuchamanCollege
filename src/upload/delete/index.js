const {unlink}=require('fs');
const path = require('path');
const delImg=(name)=>{
    const result= new Promise((resolve,rej)=>{
        unlink(path.join(__dirname,'..','photos',name),(err)=>{
            if (err) {        
                console.log("err at delete image",err);
                return rej(false);
            }
        });
        return resolve(true);
    })
    return result
}

module.exports=delImg;