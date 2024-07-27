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
      accessKeyId:process.env.S3_ACCESSKEYID||"",
      secretAccessKey:process.env.S3_SECREAT_ACCESSKEY||"",
    },
  });

  static async getPresignedUrlForS3(key: string, type: any) {
    const Command = new PutObjectCommand({
      Bucket: "krish-b264",
      Key: key,
      ContentType: type,
    });
    const presignedUrl = await getSignedUrl(this.s3Client, Command);
    return presignedUrl;
  }
}
