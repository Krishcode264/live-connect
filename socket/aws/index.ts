import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class AwsHandler {



  static s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId:process.env.S3_ACCESSKEYID as string,
      secretAccessKey:process.env.S3_SECREAT_ACCESSKEY as string,
    },
  });

  static async getPresignedUrlForS3(key: string, type: any) {
    const Command = new PutObjectCommand({
      Bucket: "krish-b264",
      Key: key,
      ContentType: type,
    });
    console.log(process.env.S3_ACCESSKEYID,"access key id");
       console.log(process.env.S3_SECREAT_ACCESSKEY, "secret access key ");
    return await getSignedUrl(this.s3Client, Command);
   
  }

  static async getObjectUrl(key:string,expiresIn:number){
    const command=new GetObjectCommand({
      Bucket:"krish-b264",
      Key:key
    })
    return await getSignedUrl(this.s3Client,command,{expiresIn})
  }
}
