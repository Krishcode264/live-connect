import express, { Request, Response } from "express";
export const feedRouter = express.Router();
import UserService from "../Services/UserService/userService";
import { UserData } from "../mongoose/schemas/userSchema";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { PhotoService } from "../Services/PhotoService/photoService";
import { PhotosData } from "../mongoose/schemas/photoSchema";

export async function getFeedUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await UserData.find().select("id age name location gender profile");
 
    const sendusers=await  Promise.all(users.map(async(user)=>{
      const photos=await PhotoService.getPhotosbyId(user.id)
     
      return {
        ...user.toObject(),
        photos:photos
      }
    }))
    res.status(200).send(sendusers);
  } catch (err) {
    res.status(500).json({ message: "error fetching feed users" });
  }
}

export async function getUserPhotos(req: Request, res: Response) {
const {id}=req.query;
if (typeof(id)=="string"){
  res.send(await PhotoService.getPhotosbyId(id));
}
}

feedRouter.get("/getFeedUsers", getFeedUsers);

feedRouter.get("/getUserPhotos", getUserPhotos);
