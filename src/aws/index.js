const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv/config");

const client=new S3Client(
{
    region:"ap-south-1",
    credentials:{
        accessKeyId:process.env.AWS_ACCESSKEYID,
        secretAccessKey:process.env.AWS_SECRETKEY
    }
})


const geturl=async(key)=>{
    const command=new GetObjectCommand({Bucket:process.env.AWS_BUCKET,Key:key});
    const url=await getSignedUrl(client,command)
    return url;
}

async function putobject(filetype,k){
    try {
        const key=`image/${Date.now()}.${filetype}`;
        const command=new PutObjectCommand({Bucket:process.env.AWS_BUCKET,Key:k!==null?k:key,ContentType:`image/${filetype}`});
        const url=await getSignedUrl(client,command)
        return {url,key:k!==null?k:key}
    } catch (error) {
        console.log(error)
    }
  
}

async function deleteImg(key){
    // const key=`images/${Date.now()}.${filetype}`;
    try {
        const command=new DeleteObjectCommand({Bucket:process.env.AWS_BUCKET,Key:key,ContentType:`image/jpg`});
        const url=await getSignedUrl(client,command)
       console.log("success")
        return {url,key}  
    } catch (error) {
        console.log(error)
    }
   
}



module.exports={geturl,putobject,deleteImg}