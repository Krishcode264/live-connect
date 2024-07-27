import express, { Request, Response } from "express";
export const feedRouter = express.Router();
import UserService from "../Services/UserService/userService";
import { UserData } from "../mongoose/schemas/userSchema";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


  export async function getFeedUsers(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const users = await UserData.find();
   res.status(200).send(users)
    } catch (err) {
      res.status(500).json({ message: "error fetching feed users"});
    }
  }

  feedRouter.get("/getFeedUsers",getFeedUsers)