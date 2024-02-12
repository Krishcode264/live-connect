import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { UserData } from "../mongoose/model/userModel";
import type { User } from "../types/types";
async function checkTokenValidity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization || req.body.token;
  const user = await tokenIsValid(token);
 
  if (user) {
    if (req.path == "/validateToken") {
      res.send(user);
      console.log("valid token")
    } else {
      next();
    }
  } else {
    res
      .status(401)
      .json({ message: "Session has expired. Please login again." ,redirect:"/login"});
  }
}

async function tokenIsValid(token: string): Promise<User | undefined> {
  const decodeToken: any = jwt.decode(token);
  const user = await UserData.findOne({ id: decodeToken.id });
  if (user) {
    return { name: user.name, id: user.id };
  }
  else{
 return undefined;
  }
 
}

export default checkTokenValidity;
