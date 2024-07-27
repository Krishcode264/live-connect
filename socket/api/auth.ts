import express, { Request, Response } from "express";
export const authRouter = express.Router();
import { PhotosData } from "../mongoose/schemas/photoSchema";
import  UserService from "../Services/UserService/userService";
import { UserData } from "../mongoose/schemas/userSchema";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const generateToken = (data: any) => {
  // console.log(process.env.JWT_SECRET, "process");
  const secretKey = process.env.JWT_SECRET as string; // Replace with your actual secret key
  const token = jwt.sign(data, secretKey, { expiresIn: "1h" });

  return token;
};
const handleUserSignup = async (req: Request, res: Response) => {
  const { email } = req.body;
  // console.log(email);
  try {
    const alreadyExistedUserWithSameEmail = await UserService.checkUserAlreadyExist(email);
  //  console.log(alreadyExistedUserWithSameEmail);
    if (alreadyExistedUserWithSameEmail.length === 0) {
      const createdUser = await UserService.saveUserData(req.body, {
        provider: "credencial",
      });
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
    if (
      userwithEmail.authType?.provider !== "credencial"
    ) {
      res.send({
        status: "error",
        message:
          "You tried signing in with a different authentication method than the one you used during signup",
      });
      return;
    }
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

async function googleLogin(req: Request, res: Response) {
 // console.log("got req for google auth", req.body);
  const { user, expires } = req.body;

  const userExists = await UserService.checkUserAlreadyExist(user.email);
  if (userExists.length === 0) {
    const savedUser = await UserService.saveUserData({...user,profile:user.image}, { provider: "google", expires });
    if (savedUser){
      const {name,gender,age,id,profile}=savedUser;
res.send({
  status: true,
  user: { name, age, gender ,id,profile},
  messages: "user loggoed in with google success (new user)",
});
    }
      
    else res.send({ status: false, messages: "error saving user " });
  } else {
    const expirationDate = new Date(expires);
    const currentdate=new Date();

    const isExpired = expirationDate <currentdate;

    console.log(isExpired,expirationDate,new Date());
    if (isExpired) {
      res.send({
        status: false,
        messages: "session has expired with google , try loggin again ...",
      });
    } else {
      const { name, age, gender, id, profile }=userExists[0];
      res.send({
        status: true,
        user: { name, age, gender, id, profile },
        messages: "auth success with google ",
      });
    }
  }
}
authRouter.post("/signup", handleUserSignup);
authRouter.post("/login", handleUserLogin);
authRouter.post("/google", googleLogin);
