import express, { Request, Response } from "express";
export const feedRouter = express.Router();
import UserService from "../Services/UserService/userService";
import { UserData } from "../mongoose/schemas/userSchema";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { PhotoService } from "../Services/PhotoService/photoService";
import { PhotosData } from "../mongoose/schemas/photoSchema";
function isString(value: any): value is string {
  return typeof value === "string";
}

export async function getFeedUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await UserData.find().select(
      "id age name location gender profile"
    );


    res.status(200).send(users);
  } catch (err) {
    res.status(500).json({ message: "error fetching feed users" });
  }
}

export async function getUserPhotos(req: Request, res: Response) {
  const { id } = req.query;
  if (isString(id)) {
    res.send(await PhotoService.getPhotosbyId(id));
  }
}
export async function getUser(req: Request, res: Response) {
  const { id } = req.query;
  if (isString(id)) {
   res.send(await UserService.getUserProfile(id));
  }
  
}

feedRouter.get("/getFeedUsers", getFeedUsers);
feedRouter.get("/getUser", getUser);
feedRouter.get("/getUserPhotos", getUserPhotos);
