
import mongoose from "mongoose";
import { UserSchemaType } from "../../types/types";
import { userSchema } from "../schemas/userSchema";
import { v4 as uuidv4 } from "uuid";
import { UserData } from "../model/userModel";

export const saveUserData = async (
  data: UserSchemaType
): Promise<UserSchemaType | null> => {
  try {
    const newUser = new UserData({ ...data, id: uuidv4() });
    const savedUser = await newUser.save();
    return savedUser as UserSchemaType | null; // Update the type of savedUser
  } catch (err) {
    console.log(err, "err saving connected socket user");
    return null;
  }
};

export const deleteUserData = async (
  id: string
): Promise<UserSchemaType | null> => {
  try {
    const deletedUser = await UserData.findOneAndDelete({ socketID: id });
    return deletedUser as UserSchemaType | null; // Update the type of deletedUser
  } catch (err) {
    console.log(err, "err deleting user ");
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const connectedUsers = await UserData.find();
    return connectedUsers;
  } catch {
    return null;
  }
};

export const findUserById = async (id: string): Promise<string | null> => {
  try {
    const targetUser: UserSchemaType | null = await UserData.findOne({ id });

    if (!targetUser?.socketID) {
      return null; // Return null when user is not found
    }

    return targetUser.socketID;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw error; // Handle the error or rethrow for higher-level handling
  }
};
