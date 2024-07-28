import express from "express";
import { Request, Response } from "express";
const uploadRouter = express.Router();
import { AwsHandler } from "../aws";
import { photoSchema, PhotosData } from "../mongoose/schemas/photoSchema";
import { UserData } from "../mongoose/schemas/userSchema";
import { PhotoService } from "../Services/PhotoService/photoService";
export async function createPresignedUrl(req: Request, res: Response) {
  const { id, fileName, type } = req.query;

  const key = `users/${id}/${Date.now()}_${fileName}`;
  try {
    const url = await AwsHandler.getPresignedUrlForS3(key, type);
    res.json({ url, key });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res.status(500).json({ error: "Error generating presigned URL" });
  }
}

async function handleFileUploadSuccess(req: Request, res: Response) {
  const { key, id } = req.query;
  try {
    const user = await UserData.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (typeof key == "string" && user._id) {
      const url = await AwsHandler.getObjectUrl(key,1800);
     const photo= await PhotoService.savePhoto({
        key: key,
        imageUrl: url,
        uploader: user._id,
        urlExpirationTime:new Date(new Date().getTime()+1600*1000),
      });
      console.log("image save success", photo);
      res
        .status(200)
        .send({ message: "we saved your image url to databse ", photo });
    }
  } catch (err) {
    console.log(err, "err");
    res.status(404).json({ message: "something went wrong with image upload" });
  }
}

uploadRouter.use("/getPresignedUrl", createPresignedUrl);
uploadRouter.use("/success", handleFileUploadSuccess);
export default uploadRouter;
