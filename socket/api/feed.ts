

import express, { Request, Response } from "express";
export const feedRouter = express.Router();
import { saveUserData } from "../mongoose/mongo_helpers/helper";
import { UserData } from "../mongoose/model/userModel";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


  export async function getFeedUsers(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const users = await UserData.find();
      console.log(users)
   res.status(200).send(users)
    } catch (err) {
      res.status(500).json({ message: "error fetching feed users"});
    }
  }

  feedRouter.get("/getFeedUsers",getFeedUsers)