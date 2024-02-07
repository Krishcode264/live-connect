import express, { Request, Response } from "express";
export const authRouter = express.Router();
import { saveUserData } from "../mongoose/mongo_helpers/helper";
import { UserData } from "../mongoose/model/userModel";
import jwt from "jsonwebtoken";

const checkUserAlreadyExist = async (email: string) => {
  const users = await UserData.find({ email });
  return users;
};
const generateToken = (data: any) => {
  console.log(process.env.JWT_SECRET, "process");
  const secretKey = process.env.JWT_SECRET as string; // Replace with your actual secret key
  const token = jwt.sign(data, secretKey, { expiresIn: "1h" });

  return token;
};
const handleUserSignup = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(email);
  try {
    const alreadyExistedUserWithSameEmail = await checkUserAlreadyExist(email);
    console.log(alreadyExistedUserWithSameEmail);
    if (alreadyExistedUserWithSameEmail.length === 0) {
      const createdUser = await saveUserData(req.body);
      if (createdUser) {
        const token = generateToken({
          name: createdUser.name,
          id: createdUser.id,
        });
        res.send({
          status: "success",
          message: "successfully signed up",
          user: { name: createdUser.name, id: createdUser.id, token },
        });
      }
    } else {
      res.send({
        status: "error",
        message: "user with email alredy exist try login",
      });
    }
  } catch (err) {
    console.log(err, "err saving user");
    res.send({ status: "error", message: "something went wrong" });
  }
};

const handleUserLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userwithEmail = await UserData.findOne({ email });
  if (userwithEmail) {
    if (userwithEmail.password === password) {
      const token = generateToken({
        name: userwithEmail.name,
        id: userwithEmail.id,
      });
      res.send({
        status: "success",
        message: "successfully logged in",
        user: { name: userwithEmail.name, id: userwithEmail.id, token },
      });
    } else {
      res.send({
        status: "error",
        message: "password is incorrect",
      });
    }
  } else {
    res.send({
      status: "error",
      message: "user with email does not exist",
    });
  }
};
authRouter.post("/signup", handleUserSignup);
authRouter.post("/login", handleUserLogin);
