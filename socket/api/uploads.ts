import express from "express";
import { Request, Response } from "express";
const uploadRouter = express.Router();
import { AwsHandler } from "../aws";
import { photoSchema, PhotosData } from "../mongoose/schemas/photoSchema";
import { UserData } from "../mongoose/schemas/userSchema";

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
  console.log(id,"id of the user ")
  try {
    const user = await UserData.findOne({ id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await new PhotosData({
      key: key,
      uploader: user._id, 
    }).save();

    console.log("image save success", key);
    res.status(200).send({ message: "we saved your image url to databse " });
  } catch {}
}

uploadRouter.use("/getPresignedUrl", createPresignedUrl);
uploadRouter.use("/success", handleFileUploadSuccess);
export default uploadRouter;
