const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const client=new S3Client(
{
    region:process.env.AWS_REGION,
    credentials:{
        accessKeyId:process.env.AWS_ACCESSKEYID,
        secretAccessKey:process.env.AWS_SECRETKEY
    }
})


const geturl=async()=>{
    const command=new GetObjectCommand({Bucket:"prakashnodejs",Key:"images/lastchance.png"});
    const url=await getSignedUrl(client,command)
   
    console.log(url)
}

async function putobject(){
    const command=new PutObjectCommand({Bucket:"prakashnodejs",Key:"images/lastchance.png",ContentType:"image/png"});
    const url=getSignedUrl(client,command)
   
    return url
}

const result =async ()=>{
    console.log(await putobject())
}

// result()

geturl()